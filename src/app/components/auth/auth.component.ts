import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _authService: AuthService,
  private _router:Router) {
   
   }
  signupResp: string="";
  isLogin: boolean = true;
  isSignedUp: boolean = false;
  authForm = new FormGroup({
    password: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });


  ngOnInit(): void {
    

  }


  onSubmit() {
    if (this.isLogin) {
      this._authService.signup(this.authForm.value).subscribe(
        (data) => {
          this._authService.setLocalToken(data.token);
          this._authService.setLocalUser(data.user);
          this.signupResp = "Successfully Registered";
          this._router.navigate([''])
        },
        (error) => {
          this.signupResp = error.msg;
          this._router.navigate(['']);
        }
      
      
      )
      console.log(this.authForm.value);

    }
    else
      console.log("Signup")
  }
}
