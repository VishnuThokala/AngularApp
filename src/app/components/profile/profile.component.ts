import { FormGroup, FormBuilder, Form, FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = new User;
  
 
  constructor(private _authService: AuthService,
  private  _formBuilder:FormBuilder)
  {
    
  };
  profileEditForm = this._formBuilder.group({
    displayName: this.user.displayName,
    email: this.user.email,
    phoneNumber: this.user.phoneNumber
  })

 
  ngOnInit(): void {
    this.setUser();
  }

  setUser() {
    var s = this._authService.getLocalUser();
    if (s != null) {
      this.user = JSON.parse(s);

      this.user={
        displayName : this.user.displayName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        password: '',
        uid: this.user.uid
      }
     
    }
  }
  editProfile() {

    
    this._authService.editUserProfile(this.profileEditForm.value,this.user.uid).subscribe(user => {
      this._authService.setLocalUser(user);
      this.setUser();
      console.log("successfuly edited profile")
    },
      (error) => {
        console.log("cant update profile Try again!",error)
        
      }
    )
  }

}
