import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './services/authentication.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    // private toastr:ToastrService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const header = this.authService.getToken();
    let newReq;
    if (
      req.url.indexOf('/login') > -1 ||
      req.url.indexOf('/register') > -1 ||
      req.url.indexOf('/reset-password') > -1
    ) {
      newReq = req.clone();
    } else {
      if(Object.keys(header).length>0){

        console.log(header);
        newReq = req.clone({
        headers: req.headers.set('Authorization', header),
      });
    }else{
      newReq = req.clone();
    }
    }
    this.spinner.show();

    return next.handle(newReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // this.spinner.hide();
        if (error.status === 401) {
          // this.toastr.error('Token has been expiered you have been logout!')
          this.authService.logout();
        }
        return throwError(error);
      }),finalize(()=>{
        this.spinner.hide()
      })
    );
  }
}
