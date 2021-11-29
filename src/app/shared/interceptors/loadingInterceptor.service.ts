import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { LoadingService } from "../services/loading.service";
import { finalize, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoader();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hideLoader())
    );
  };
}
