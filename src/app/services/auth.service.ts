import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;
  isLoggedIn: boolean = false;
  SERVER_URI: string = "http://localhost:3000/";
  showLoginUI: boolean = false;
  constructor(private http: HttpClient) {
    console.log(" auth services constructor called ! !")
    var stringdata = this.getLocalUser();
    console.log("in auth services constructor stringdata= ", stringdata);

    if (stringdata != null) {
      var data = JSON.parse(stringdata)
      console.log("in auth services constructor jsondata=", data)

      this.user = new User(data.displayName,
        data.email,
        data.phoneNumber,
        data.password,
        data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
        data.uid,
        data.customClaims,
        

      );
      console.log(" after auth services constructor user = ! !", this.user)
    }
  }
  
  getLocalUser() {
    return localStorage.getItem('user');
  }
  getLocalToken() {
    return localStorage.getItem('token');
  }
  setLocalUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log("setLocalUser", this.user);
    this.setUser();
  }
  setLocalToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  // setCustomClaim(claim: string) {
  //   localStorage.setItem('claim', JSON.stringify(claim))
  // }
  // getCustomClaim() {
  //   var claim = localStorage.getItem('claim');
  //   if (claim != null)
  //     return JSON.parse(claim)
  //   else
  //     return null;
  // }
  checkLocalStorageItem():boolean {
    if (localStorage.length!=2) {
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
    const data = JSON.parse(this.getLocalUser() || '');
    console.log("AUTH SERVICE SET USER this.getLocalUser();", data);
    console.log("intosetuser model method", data.displayName,
      data.email,
      data.phoneNumber,
      data.password,
      data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
      data.uid)
    console.log("AUTH SERVICE before setusermodel;", this.user);
    console.log("intosetuser model method", data.displayName,
      data.email,
      data.phoneNumber,
      data.password,
      data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
      data.uid,
      data.claims);
    this.user = new User(data.displayName,
      data.email,
      data.phoneNumber,
      data.password,
      data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
      data.uid,
      data.claims)
        this.user.setUserModel(data.displayName,
          data.email,
          data.phoneNumber,
          data.password,
          data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
          data.uid,
        data.claims);
        console.log("AUTH SERVICE SET USER after set user model;", this.user);
    return this.user;
    }
  
  signup(userData: { userName: any; email: any; password: any; phoneNumber: any; }): Observable<any> {
    var signup_uri = this.SERVER_URI + "adminSignup";
    return this.http.post<User>(signup_uri, {
      'username': userData.userName,
      'email': userData.email, 'password': userData.password, 'phone': userData.phoneNumber
    })
  
  }
  login(userData: {  email: any; password: any;}): Observable<any> {
    var signup_uri = this.SERVER_URI + "login";
    return this.http.post<User>(signup_uri, { 'email': userData.email, 'password': userData.password })
  
  }
  logout(): Observable<any> {
   
    console.log("authservice logout");
    var uri = this.SERVER_URI + "logout";
    return this.http.get<any>(uri);
  }

  canActivate() {
    return this.checkLocalStorageItem()||this.isLoggedIn;
  }
  
  editUserProfile(userData: any, uid: String): Observable<any> {
    var signup_uri = this.SERVER_URI + "editProfile";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getLocalToken()}`
    })
    return this.http.post<User>(signup_uri, { 'email': userData.email, 'password': userData.password, 'displayName': userData.displayName,'uid':uid ,'phoneNumber':userData.phoneNumber ,'photoURL':userData.photoURL},{ headers: headers } )
    
  }
  
}
