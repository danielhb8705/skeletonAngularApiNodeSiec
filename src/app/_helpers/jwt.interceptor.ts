import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services";
import {NgxSpinnerService} from "ngx-spinner";



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    activeRequests = 0;
    constructor(private authService: AuthenticationService, private router: Router,private spinner: NgxSpinnerService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.activeRequests === 0) {
            this.spinner.show();
        }

        this.activeRequests++;
        // add authorization header with jwt token if available
        let currentUser = this.authService.getCurrentSession();
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    token: `${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                    this.spinner.hide();
                }
            })
        );
    }
}
