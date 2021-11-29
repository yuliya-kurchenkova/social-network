import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { LoadingService } from '../../shared/services/loading.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  public formEdit: FormGroup | any
  public user!: User;
  public userObj!: any;
  public currentUser: any = {};
  public options: number[] = [];
  public optionsStart: number[] = [];
  public yearOfAdmission: number | any;
  public option: number | any;
  public myImage: any;
  public isImageSaved: boolean | any;
  public isRangeValid: boolean | any;


  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private loadingService: LoadingService
    ) { }


 public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.auth.getByIdUser(params['id'])
      })
    ).subscribe((user: User) => {
      this.user = user
      this.userObj = Object.values(user)[0]
      this.getUser(this.userObj.uid)
    });

    this.formEdit = new FormGroup({
      img: new FormControl(''),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', Validators.required),
      country: new FormControl('ru'),
      city: new FormControl(''),
      skills: new FormArray([]),
      university: new FormControl(''),
      speciality: new FormControl(''),
      yearOfAdmission: new FormControl(null),
      yearOfEnding: new FormControl(null)
    })
    this.addStart();
  };

   public encodeImageFileAsURL($event: Event): void {
    const file: any = ($event.target as HTMLInputElement)?.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
     this.myImage = reader.result;
    }
    reader.readAsDataURL(file);
     this.isImageSaved = true;
  };

  public addStart(): void {
    for (let i = 1980; i < 2022; i++){
      this.optionsStart.push(i)
      this.options.push(i)
    }
  };

  public addOld(): void {
    const start:Date = this.formEdit.get("yearOfAdmission")?.value;
    const end:Date = this.formEdit.get("yearOfEnding")?.value;
      for (let i: any = start; i < end; i++){
        this.options.push(i)
    }
  };

  public getUser(id: string): void {
    this.auth.getByIdUser(id).subscribe(res => {
      this.currentUser = Object.values(res)[0];
      this.currentUser.id = Object.keys(res)[0];

      this.formEdit.patchValue({firstName: this.currentUser.firstName});
      this.formEdit.patchValue({lastName: this.currentUser.lastName});
      this.formEdit.patchValue({email: this.currentUser.email});
      this.formEdit.setControl({skills: this.currentUser.skills});
      this.formEdit.patchValue({country: this.currentUser.country});
      this.formEdit.patchValue({city: this.currentUser.city});
      this.formEdit.patchValue({university: this.currentUser.university});
      this.formEdit.patchValue({speciality: this.currentUser.speciality});
      this.formEdit.patchValue({yearOfAdmission: this.currentUser.yearOfAdmission});
      this.formEdit.patchValue({yearOfEnding: this.currentUser.yearOfEnding});
      this.formEdit.patchValue({img: this.myImage});
    });
  };


  public addSkill(): void {
    const control = new FormControl('', Validators.required);
    (this.formEdit.get('skills') as FormArray).push(control);
  };

  public removeSkills(index: number): void {
    const control: number | any = new FormControl('', Validators.required);
    (this.formEdit.get('skills') as FormArray).removeAt(control);
  };

  public removeImg(): void {
    this.formEdit.get('img').reset();
    this.isImageSaved = false;
  };

  public editUser() {
    const editedUser: User = {
      img: this.myImage,
      firstName: this.formEdit.value.firstName,
      lastName: this.formEdit.value.lastName,
      email: this.formEdit.value.email,
      password: this.currentUser.password,
      uid: this.currentUser.uid,
      isAdmin: this.currentUser.isAdmin,
      skills: this.formEdit.value.skills,
      country: this.formEdit.value.country,
      city: this.formEdit.value.city,
      university: this.formEdit.value.university,
      speciality: this.formEdit.value.speciality,
      yearOfAdmission: this.formEdit.value.yearOfAdmission,
      yearOfEnding: this.formEdit.value.yearOfEnding,
      isOnline: this.currentUser.isOnline
    };
      this.auth.editUser(editedUser, this.currentUser.uid, this.currentUser.id)
        .subscribe(e => {
          this.router.navigate(['user-details'], {
            queryParams: {id: editedUser.uid}
          });
        });
    this.showSuccessMessage();
  };

  public showSuccessMessage(): void {
    this.toastrService.success('User was successfully changed!');
  };

  public get isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  };

}
