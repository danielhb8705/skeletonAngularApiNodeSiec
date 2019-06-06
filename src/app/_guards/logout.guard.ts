import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../_services';


@Injectable({ providedIn: 'root' })
export class OutGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.auth.getCurrentSession();
        if (currentUser) {
            // authorised so return true
            this.auth.logout();

           // this.router.navigate([this.router.url]);

        }


        // not logged in so redirect to login page with the return url

        return true;
    }
}
