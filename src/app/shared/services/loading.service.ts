import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading$ = new BehaviorSubject(false);

  public isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  };

  public showLoader(): void {
    this.loading$.next(true);
  };

  public hideLoader(): void {
    this.loading$.next(false);
  };

}
