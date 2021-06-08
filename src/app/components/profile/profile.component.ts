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
  user:User ;
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
    console.log("oninit::PROFILE this._authService.getUser()", this._authService.getUser())
    var strdata = this._authService.getLocalUser();
    if (strdata != null) {
      var data = JSON.parse(strdata);
      this.user = new User(data.displayName,
        data.email,
        data.phoneNumber,
        data.password,
        data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
        data.uid,
        data.customerClaims)
      this.user.setUserModel(data.displayName,
        data.email,
        data.phoneNumber,
        data.password,
        data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
        data.uid,
        data.customerClaims);
      console.log("oninit::PROFILE this.user", this.user);
    }

  }

  

  editProfile() {
    this._authService.editUserProfile(this.profileEditForm.value, this.user.uid).subscribe(user => {
      console.log("successfuly edited profile!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // console.log("before",user);
      this._authService.setLocalUser(user);
      // this.ngOnInit();
      // console.log("this._authService.getUser();", this._authService.getUser());
      // this.user = this._authService.getUser();
      // console.log("this.user",this.user)
      // return this.user;
      // // window.location.reload();
    },
      (error) => {
        console.log("cant update profile Try again!",error)
        this._router.navigate(["/home"])
      }
    )
  

}
}
