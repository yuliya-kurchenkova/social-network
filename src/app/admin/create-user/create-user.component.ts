import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { regs } from '../../shared/constants/regs';
import { LoadingService } from '../../shared/services/loading.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {
  public registrationForm!: FormGroup;
  public error: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private loadingService: LoadingService
  ) { }

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(regs.EMAIL)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(regs.PASSWORD)
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  };

  public submit() {
    if (this.registrationForm.invalid) {
      return;
    }
    const user: User = {
      img: this.registrationForm.value.img = '',
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      isAdmin: this.registrationForm.value.isAdmin = false,
      uid: this.registrationForm.value.uid,
      skills: this.registrationForm.value.skills = '',
      city: this.registrationForm.value.city = '',
      country: this.registrationForm.value.country = '',
      university: this.registrationForm.value.university = '',
      speciality: this.registrationForm.value.speciality = '',
      yearOfAdmission: this.registrationForm.value.yearOfAdmission = '',
      yearOfEnding: this.registrationForm.value.yearOfEnding = '',
      isOnline: this.registrationForm.value.isOnline = false
    };

    this.auth.createUser(user)
      .then(res => {
        user.uid = res.user?.uid;
        this.auth.postDbUser(user)
          .subscribe(e => {
            this.showSuccessMessage()
            this.router.navigate(['user-list']);
          },err => {
            this.error = err.message;
          })
      })
  }

  public showSuccessMessage(): void {
    this.toastrService.success('New user creation was successful!');
  };

  public get isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  };

}
