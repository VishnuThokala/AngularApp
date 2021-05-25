import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _authService: AuthService ) {
   
   }

  isLogin: boolean = true;
  isSignedUp: boolean = false;
  authForm = new FormGroup({
    password: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });


  ngOnInit(): void {
    var userData = localStorage.getItem('user');

  }


  onSubmit() {
    if (this.isLogin) {
      this._authService.signup(this.authForm.value)
      console.log(this.authForm.value);

    }
    else
      console.log("Signup")
  }
}
