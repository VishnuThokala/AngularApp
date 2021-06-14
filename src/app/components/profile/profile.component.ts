import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, FormBuilder, Form, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User ;
  data: any;
  userData: any;
  selectedFiles: FileList;
  currentFileUpload: any;
  percentage: number;

  disableEmailbox: boolean = false;
  downloadUrl: any;
 
  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder, private _router: Router, private _fireService:FirebaseService) { };

  profileEditForm = new FormGroup({
    displayName: new FormControl({ value: ' ' }, Validators.required),
    email: new FormControl({ value: ' ', disabled: true }, Validators.required),
    phoneNumber: new FormControl({ value: '' }),
  })

  
  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);

    this.currentFileUpload = new FileUpload(file!);
    this._fireService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage: any) => {
        this.percentage = Math.round(percentage);
        if (this.percentage === 100) {
          Swal.fire('Yes', 'uploaded', 'success');
          this.downloadUrl = this._fireService.getPhotoUrl();
          localStorage.setItem('photoURL', this.downloadUrl)
        }
     
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
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
    this.userData.photoURL = localStorage.getItem('photoURL') || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png'
    // this._fireService.getDbUsers();
  }

 
  // addImage() {
  //   let img = (<HTMLInputElement>document.getElementById('img')).files;
  //   if (img?.length) {
  //     console.log(img[0]);
  //     this._authService.uploadImage(img[0],this.userData.uid).subscribe((data) => {
  //       console.log(data);
  //     })
  //   }
  // }

  editProfile() {
    this._authService.editUserProfile(this.profileEditForm.value, this.userData.uid).subscribe(res => {
      console.log("successfuly edited profile!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",res.user);
      this._authService.setLocalUser(res.user);
      var strdata = this._authService.getLocalUser();
      if (strdata != null) {
        var data = JSON.parse(strdata);
        this.userData = {
          displayName: data.displayName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          photoURL: data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
          uid: data.uid,
          customerClaims: data.customerClaims
        }
      }
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
function photoURL(arg0: string, photoURL: any) {
  throw new Error('Function not implemented.');
}

