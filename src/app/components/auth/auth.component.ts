import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
  isLogin: boolean = false;
  isSignedUp: boolean = false;
  authForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('')
  });

  get f() {
    return this.authForm.controls;
  }

  ngOnInit(): void {
    

  }


  onSubmit() {
    if (!this.isLogin) {
      this._authService.signup(this.authForm.value).subscribe(
        (data) => {
          this.signupResp = "Successfully Registered";
          this._authService.showLoginUI = true;
          this._router.navigate(['/login']);
        },
        (error) => {
          this.signupResp = error.error.msg;
          Swal.fire('No!', error.error.msg, 'error')
          console.log("eoororeddy", error);
        }
      
      );
      console.log(this.authForm.value);

    }
    else
      console.log("Signup")
  }
}
