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
  SERVER_URI: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {
    
   
  }
  
  getLocalUser()  {
    return localStorage.getItem('user');

  }
  getLocalToken() {
    return localStorage.getItem('token');
  }
  setLocalUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    
  }
  setLocalToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token))

  }
   
  checkLocalStorageItem() {
    if (localStorage.length!=2) {
      return false;
    }
    else {
      return true;
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
    return this.http.get<any>("http://localhost:3000/logout/");
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
    return this.http.post<any>(signup_uri, { 'email': userData.email, 'password': userData.password, 'displayName': userData.displayName,'uid':uid },{ headers: headers } )
    
  }

}
