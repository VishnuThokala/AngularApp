import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = new User;
  isLoggedIn: boolean = false;
  SERVER_URI: string = "https://vebapi.herokuapp.com/";
  showLoginUI: boolean = false;
  constructor(private http: HttpClient) {   
  }
  
  getLocalUser() {
    return localStorage.getItem('user');
    
  }
  getLocalToken() {
    return localStorage.getItem('token');
  }
  setLocalUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    this.setUser();
  }
  setLocalToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  setCustomClaim(claim: string) {
    localStorage.setItem('claim', JSON.stringify(claim))
  }
  getCustomClaim() {
    var claim = localStorage.getItem('claim');
    if (claim != null)
      return JSON.parse(claim)
    else
      return null;
  }
  checkLocalStorageItem() {
    if (localStorage.length!=3) {
      return false;
    }
    else {
      return true;
    }
  }
  getUser(): User{
    this.setUser();
    return this.user;
  }
  setUser() {
    var s = this.getLocalUser();
      if(s)
    var data = JSON.parse(s);
    this.user = {
      displayName: data.displayName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      photoURL: data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
      uid: data.uid
    }

    }
  
  signup(userData: { userName: any; email: any; password: any; phoneNumber: any; }): Observable<any> {
    var signup_uri = this.SERVER_URI + "userSignup";
    return this.http.post<any>(signup_uri, {
      'username': userData.userName,
      'email': userData.email, 'password': userData.password, 'phone': userData.phoneNumber
    })
  
  }
  login(userData: {  email: any; password: any;}): Observable<any> {
    var signup_uri = this.SERVER_URI + "login";
    return this.http.post<any>(signup_uri, { 'email': userData.email, 'password': userData.password })
  
  }
  logout(): Observable<any> {
   
    console.log("authservice logout");
    var uri = this.SERVER_URI + "logout";
    return this.http.get<any>(uri);
  }

  canActivate() {
    return this.checkLocalStorageItem()||this.isLoggedIn;
  }
  submitQuizQuestions(questionArr: Array<string>, optionsArr: Array<string>, correctAnswerArr:Array<string>):Observable<any> {
    var signup_uri = this.SERVER_URI + "submitQuizQuestions";
    return this.http.post<any>(signup_uri,{questionArr,optionsArr,correctAnswerArr})
  }
  editUserProfile(userData: any,uid:String) {
    var signup_uri = this.SERVER_URI + "editProfile";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getLocalToken()}`
    })
    return this.http.post<any>(signup_uri, { 'email': userData.email, 'password': userData.password, 'displayName': userData.displayName,'uid':uid ,'phoneNumber':userData.phoneNumber ,'photoURL':userData.photoURL},{ headers: headers } )
    
  }
  
}
