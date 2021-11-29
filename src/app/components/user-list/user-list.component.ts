import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { DelUserModalComponent } from './del-user-modal/del-user-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  public uidCurrent: string | any;
  public userObj: any;
  public users: User[] = [];
  public error!: string;
  public searchStr: string = '';
  public customPatterns = { '0': { pattern: new RegExp('\[а-яА-Яa-zA-Z0-9 \'\]')} };
  public isAdmin = this.localStorageService.get('isAdmin') === 'true';


  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService
  ) { }

  public ngOnInit(): void {
    this.getUser();
  };

  public getUser(): void {
    this.users = []
    this.auth.getDbUsers()
      .subscribe(users => {
        for(let key in users) {
          let user = users[key];
          user.id = key;
          this.userObj = Object.values(user)[0];

          if(!this.userObj.isAdmin) {
            this.users.push(user);
          }
        }
      });
  };

  public deleteUser(user: User) {
    let dialogRef = this.dialog.open(DelUserModalComponent, {
      width: '500px',
      data: user
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.removeUser(this.userObj.uid).subscribe(() => {
          this.getUser();
          this.showSuccessMessage();
        });
      }
    });
  };

  public showSuccessMessage(): void {
    this.toastrService.success('User has been successfully deleted!');
  };

  public get isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  };

}
