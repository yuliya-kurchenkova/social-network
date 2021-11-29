import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public isSignIn: boolean | any;
  public language: string = 'en';
  public userObj: any;
  public userObjId: string | any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.language);
  }

  public ngOnInit(): void {
    this.auth.stream$.subscribe((value: boolean) => {
      this.isSignIn = value;
    })
    this.isSignIn = this.localStorageService.get('isAdmin');
  };


  public logoutBtn(): void {
    this.auth.getByIdUser(JSON.parse(localStorage['uid'])).subscribe(res =>{
      this.userObj = Object.values(res)[0]
      this.userObjId = Object.keys(res)[0]
      this.auth.updatePassive(this.userObj, this.userObj.uid, this.userObjId).subscribe( er => {
        this.auth.logout();
        this.isSignIn = false
        this.router.navigate(['login']);
      });
    });
  };

  public changeLanguage(): void {
    this.language = this.language === 'en' ?  'fr' : 'en';
    this.translate.use(this.language);
  };

}
