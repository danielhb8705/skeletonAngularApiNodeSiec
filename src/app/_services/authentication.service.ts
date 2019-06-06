import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../_models";
import {Login} from "../_interfaces/login";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";



const httpOpcions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable()
export class AuthenticationService {
    private localStorageService;
    private currentUserSubject: BehaviorSubject<User>;
    public currentSession: Observable<User>;
    private API: string = environment.API;
    constructor(
        private _http: HttpClient,private router: Router) {
        this.localStorageService = localStorage;
        this.currentUserSubject = new BehaviorSubject<User>(this.loadSessionData());
        this.currentSession = this.currentUserSubject.asObservable();
    }

    login(object:Login): Promise<string> {
        return this._http.post(`${this.API}/auth/login`, JSON.stringify(object),httpOpcions)
            .toPromise()
            .then(response =>this.handleSuccess(response))
            .catch(error => AuthenticationService.handleError(error));

    }

    private static handleError(error: any): Promise<any> {
        return Promise.reject(error.message);
    }

    private  handleSuccess(response: any): Promise<any> {
        if (response.response)
        {
            let user: User = new User();
            user = response.data;
            user.token = response.token;
            this.setCurrentSession(response.data);
            this.router.navigate([" "]);
        }
        else
        {
            return Promise.resolve(response.message);
        }

    }

    public  setCurrentSession(user: User): void {
        this.localStorageService.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

    }

    loadSessionData(): User{

        var sessionStr = this.localStorageService.getItem('currentUser');
        return (sessionStr) ? <User> JSON.parse(sessionStr) : null;

    }
    logout(): void{
        this.removeCurrentSession();
        this.currentUserSubject.next(null);
        //this.router.navigate(["/login"]);
    }

    getCurrentSession(): User {
        if(this.currentUserSubject.value)
        {
            return this.currentUserSubject.value;
        }
        else
        {
            if(this.loadSessionData())
            {
                return this.loadSessionData();
            }
            else
            {
                return null;
            }
        }

    }
    removeCurrentSession(): void {
        this.localStorageService.removeItem('currentUser');
        this.currentSession = null;
    }

    isAuthenticated(): boolean {
        return (this.getCurrentToken() != null) ? true : false;
    };

    getCurrentToken(): string {
        var session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    };


}
