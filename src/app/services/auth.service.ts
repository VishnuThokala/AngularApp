import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = new User;
  SERVER_URI: string = "http://localhost:5001/webapp-92251/us-central1/app/";

  constructor(private http: HttpClient) {
    
   
   }
  signup(userData: { userName: any; email: any; password: any; phoneNumber: any; }) {
    var signup_uri = this.SERVER_URI+"user";
    this.http.post<any>(signup_uri, { 'username': userData.userName, 'email': userData.email, 'password': userData.password ,'phone':userData.phoneNumber}).subscribe(data => {
      this.user = data;
      if (data['msg'] == "successfully registerd") {
        console.log(data['token']);
       return data['token'];
      }
      else {
        console.log(data.msg)
        return data.msg;
      }
    });
  }
}
