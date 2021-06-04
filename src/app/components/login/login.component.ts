import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(private _authService: AuthService,
    private _router: Router) {

  }
  signupResp: string = "";
  isLogin: boolean = true;
  isSignedUp: boolean = false;
  authForm = new FormGroup({
    
    password: new FormControl(''),
    email: new FormControl(''),
    
  });


  ngOnInit(): void {


  }


  onSubmit() {
   
      this._authService.login(this.authForm.value).subscribe(
        (data) => {
          console.log(data);
          this._authService.setLocalToken(data.token);
          this._authService.setLocalUser(data.user);
          this.signupResp = "Successfully Registered";
          this._authService.isLoggedIn = true;
          this._router.navigate(['/home'])
        }
      ),
      (error:any)=> {
        this.signupResp = error.msg;
        this._router.navigate([''])
    }
 }
}
