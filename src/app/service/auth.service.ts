import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/Admin";
import {Resultat} from "../models/resultat";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Personne} from "../models/Personne";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private helper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  login(admin: Personne) {
    return this.http.post<Resultat<any>>(`${environment.apiUrl}/api/auth/signin`, admin)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isUserLoggedIn.next(false);
  }

}
