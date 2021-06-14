import { FormGroup, FormBuilder, Form, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { User } from 'src/app/models/user';
import { ɵangular_packages_router_router_b, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User ;
  data: any;
  userData:any;

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
     

      this.userData = {
        displayName: data.displayName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password:data.password,
        photoURL: data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
        uid:data.uid,
        customerClaims: data.customerClaims
      }
    }

  }

  

  editProfile() {
    this._authService.editUserProfile(this.profileEditForm.value, this.userData.uid).subscribe(res => {
      console.log("successfuly edited profile!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",res.user);
      // console.log("before",user);
      this._authService.setLocalUser(res.user);
      var strdata = this._authService.getLocalUser();
      if (strdata != null) {
        var data = JSON.parse(strdata);
        
        this.userData = {
          // displayName: user.displayName,
          // email: user.email,
          // phoneNumber: user.phoneNumber,
          displayName: data.displayName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          photoURL: data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
          uid: data.uid,
          customerClaims: data.customerClaims
        }
      }
      // this.ngOnInit();
      // console.log("this._authService.getUser();", this._authService.getUser());
      // this.user = this._authService.getUser();
      // console.log("this.user",this.user)
      // return this.user;
      this._router.navigate(['']);
      Swal.fire('YES', 'sucessfully edited profile', 'success');
     

            
    },
      (error) => {
        console.log("cant update profile Try again!",error)
        this._router.navigate(["/home"])
      }
    )
  

}
}
