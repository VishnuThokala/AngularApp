import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: any;
  percentage: number;
  downloadUrl: any;

  constructor(private _fireService: FirebaseService) { }

  ngOnInit(): void {
    this.downloadUrl = localStorage.getItem('photoURL')|| 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png'

  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);

    this.currentFileUpload = new FileUpload(file!);
    this._fireService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage: any) => {
        this.percentage = Math.round(percentage);
      }, 
      (error: any) => {
        console.log(error);
      },
      () => {
        console.log("hiihih")
        this.downloadUrl = localStorage.getItem('photoURL')
      },
    );
  }
}
