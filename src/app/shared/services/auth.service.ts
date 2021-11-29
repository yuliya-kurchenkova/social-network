import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { baseURL } from '../../../environments/environment';



@Injectable()
export class AuthService {
  public isSignedIn: boolean | any = false;
  public stream$ = new Subject<boolean>();

  constructor(
    private fireAuth: AngularFireAuth,
    private http: HttpClient
  ) { }


  public signIn(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  };

  public logout(): void {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('uid');
    localStorage.removeItem('id');
    this.fireAuth.signOut().then(e => {
    });
    this.stream$.next(this.isSignedIn);
  };


  public createUser(user: User): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  };

  public postDbUser(user: User): Observable<any> {
    return this.http.post(`${baseURL}/users/${user.uid}.json`, user);
  };

  public getDbUsers(): Observable<any> {
    return this.http.get(`${baseURL}/users/.json`);
  };

  public getDbUser(user: User): Observable<any> {
    return this.http.get(`${baseURL}/users/${user.uid}.json`);
  };

  public getByIdUser(id: string): Observable<User> {
    return this.http.get<User>(`${baseURL}/users/${id}.json`)
      .pipe(map((user: User) => {
        return {
          ...user,
          id
        };
      }));
  };

  public editUser(user: User, userUID: string, userID: string): Observable<any> {
    return this.http.put(`${baseURL}/users/${userUID}/${userID}.json`, {
      img: user.img,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      uid: user.uid,
      skills: user.skills,
      country: user.country,
      city: user.city,
      university: user.university,
      speciality: user.speciality,
      yearOfAdmission: user.yearOfAdmission,
      yearOfEnding: user.yearOfEnding,
      isOnline: user.isOnline
    });
  };

  public removeUser(id: string): Observable<any> {
    return this.http.delete(`${baseURL}/users/${id}.json`);
  };

  public changeIsSignedIn(bool: boolean): void {
    this.isSignedIn = bool;
    this.stream$.next(this.isSignedIn);
  };


  public updateActive(user: User, uid: string, id: string): Observable<any> {
    const body = {...user, isOnline: true};

    return this.http.put(`${baseURL}/users/${uid}/${id}.json`, body);
  };

  public updatePassive(user: User, uid: string, id: string): Observable<any> {
    const body = {...user, isOnline: false};

    return this.http.put(`${baseURL}/users/${uid}/${id}.json`, body);
  };

}
