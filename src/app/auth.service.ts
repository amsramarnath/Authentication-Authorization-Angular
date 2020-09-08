import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from './helpers/http-config';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:Http) { }

  login(credentials){
   
    console.log("AuthService credentials = "+JSON.stringify(credentials));
    let options = new RequestOptions({headers: contentHeaders});
    return this.http.post('http://localhost:8080/authenticate',JSON.stringify(credentials),options);
  } 

  logout(){
    localStorage.removeItem('jwt');
  }

  isLoggedIn(){

    //return tokenNotExpired();

    let jwtHelper = new JwtHelper();
    let jwt = localStorage.getItem('jwt');
    
    if(!jwt)
      return false;
    
    let expirationDate = jwtHelper.getTokenExpirationDate(jwt);
    let isExpird = jwtHelper.isTokenExpired(jwt);
    console.log("expirationDate="+expirationDate);
    console.log("isExpird="+isExpird);
    return !isExpird;
  }

  currentUser(){
    let jwt = localStorage.getItem('jwt');
    if(!jwt) return null;

    return new JwtHelper().decodeToken(jwt);
  }
}
