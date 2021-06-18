import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  title: any;
  cover: any;
  imageUrl: any;
  image: boolean=false;
  ngOnInit(): void {
  }
  myForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cover: new FormControl('', [Validators.required])
  });

  constructor(private _authService:AuthService ) { }

  get f() {
    return this.myForm.controls;
  }
 
  onTitleChanged(event: any) {
    console.log(event.target.value)
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.cover = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('cover',this.cover,this.cover.name)
    var data = { 'title': this.title, 'cover': this.cover}
   
    this._authService.fileUpload(formData).subscribe((resp) => {
      console.log("resp", resp)
      this.image = true;
      this.imageUrl = "https://29487e05b25a.ngrok.io/book" +resp.cover;
      Swal.fire('Yes','sucessfully uploaded','success')
    },
      (error) => {
        console.log("myerrro",error)
      Swal.fire('No','error','error')
    })
    
  }

  getFiles() {
    this._authService.fileget().subscribe((data) => {
      console.log(data);
      this.image = true;
      this.imageUrl = data.cover;
    })
  }
}


