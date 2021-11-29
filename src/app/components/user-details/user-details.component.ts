import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { LoadingService } from '../../shared/services/loading.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  public userObj: any
  public user!: User;
  public currentUser: any = {};
  public firstNameUser: string | any;
  public lastNameUser: string | any;
  public emailUser: string | any;
  public countryUser: string | any;
  public cityUser: string | any;
  public imgUser: any;
  public universityUser: string | any;
  public specialityUser: string | any;
  public yearOfAdmissionUser: number | any;
  public yearOfEndingUser: number | any;
  public skills: string[] | any;
  public currentAvatar: string | any

  public idUrl: any;
  public error: string = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(url => {
      this.idUrl = url['id'];
    },err => {
      this.error = err.message;
    })
    this.getUserDetails(this.idUrl)
  };


  public getUserDetails(id: string): void {
    this.auth.getByIdUser(id).subscribe(res => {
      this.currentUser = Object.values(res)[0];
      this.currentUser.id = Object.keys(res)[0];

      this.currentAvatar = this.currentUser.firstName[0].toUpperCase()+ this.currentUser.lastName[0].toUpperCase()
      this.firstNameUser = this.currentUser.firstName;
      this.lastNameUser = this.currentUser.lastName;
      this.emailUser = this.currentUser.email;
      this.countryUser = this.currentUser.country;
      this.cityUser = this.currentUser.city;
      this.imgUser = this.currentUser.img;
      this.universityUser = this.currentUser.university;
      this.specialityUser = this.currentUser.speciality;
      this.yearOfAdmissionUser = this.currentUser.yearOfAdmission;
      this.yearOfEndingUser = this.currentUser.yearOfEnding;
      this.skills = this.currentUser.skills;
    });
  };

  public get isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  };

}
