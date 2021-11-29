import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { regs } from '../../shared/constants/regs';
import { LoadingService } from "../../shared/services/loading.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public form: FormGroup | any;
  public err: string = '';
  public userObj: any;
  public userIsOnline: boolean | any;
  public userObjId: string | any;


  constructor(
    private auth: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(regs.EMAIL)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  };

  public login(){
    this.auth.signIn(this.form.value.email, this.form.value.password)
      .then(res => {
        this.auth.changeIsSignedIn(true);
        this.auth.getByIdUser(res.user.uid)
          .subscribe(e => {
            this.userObj = Object.values(e)[0]
            this.userObjId = Object.keys(e)[0]
            this.auth.updateActive(this.userObj, this.userObj.uid, this.userObjId).subscribe( er => {
              })
            if(this.userObj.isAdmin) {
              this.localStorageService.set('isAdmin', JSON.stringify(this.userObj.isAdmin));
              this.localStorageService.set('uid', JSON.stringify(this.userObj.uid));
              this.localStorageService.set('id', JSON.stringify(this.userObjId));
              this.router.navigate(['/admin', 'create-user']);
            } else {
              this.router.navigate(['user-list']);
              this.localStorageService.set('isAdmin', JSON.stringify(this.userObj.isAdmin));
              this.localStorageService.set('uid', JSON.stringify(this.userObj.uid));
              this.localStorageService.set('id', JSON.stringify(this.userObjId));
            }
          });
      })
      .catch(err => {
        this.form.reset();
        this.err = err.message;
      });
  };

  public get isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  };

}
