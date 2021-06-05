import { FormGroup, FormBuilder, Form, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { User } from 'src/app/models/user';
import { ɵangular_packages_router_router_b, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = new User;
  data :any;

  disableEmailbox: boolean = false;
 
  constructor(private _authService: AuthService,
  private  _formBuilder:FormBuilder,private _router:Router)
  {
    
  };
  profileEditForm = new FormGroup({
    displayName: new FormControl({ value: ' ' }, Validators.required),
    email: new FormControl({ value: ' ', disabled: true }, Validators.required),
    phoneNumber: new FormControl({ value: '' }),
  })

 
  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  

  editProfile() {
    console.log(this.profileEditForm.value)
    this.profileEditForm.value.email = this.user.email;
    this.profileEditForm.value.photoURL = this.user.photoURL
    console.log(this.profileEditForm.value)
    this._authService.editUserProfile(this.profileEditForm.value, this.user.uid).subscribe(user => {
      console.log("successfuly edited profile!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(user);
      this._authService.setLocalUser(user);
      this._authService.setUser();
      this.user = this._authService.getUser();
      window.location.reload();
    },
      (error) => {
        console.log("cant update profile Try again!",error)
        this._router.navigate(["/home"])
      }
    )
  }

}
