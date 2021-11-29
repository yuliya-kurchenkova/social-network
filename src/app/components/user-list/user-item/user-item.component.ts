import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.sass']
})
export class UserItemComponent implements OnInit {
  @Input() user: User | any;
  @Output() onDel: EventEmitter<any> = new EventEmitter<any>();

  public userObj: any
  public img: any
  public currentAvatar: string | any
  public isAdmin = this.localStorageService.get('isAdmin') === 'true'
  public isOnline: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.userObj = Object.values(this.user)[0];
    this.img = this.userObj.img;
    this.isOnline = this.userObj.isOnline;
    this.currentAvatar = this.userObj.firstName[0].toUpperCase() + this.userObj.lastName[0].toUpperCase();
  };

  public deleteUser(): void {
    this.onDel.emit(this.userObj);
  };

  public showMoreDetails(): void {
    this.router.navigate(['user-details'], {
      queryParams: { id: this.userObj.uid }
    });
  };
}
