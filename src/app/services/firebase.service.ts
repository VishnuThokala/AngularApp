import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FileUpload } from '../models/file-upload';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath = '/uploads';
  photoUrl: any;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
    
  }
  getDbUsers() {
    var users = this.db.doc('');
    console.log(users)
  }
  pushFileToStorage(fileUpload: FileUpload): Observable<number|undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.photoUrl = downloadURL;
          console.log(this.photoUrl);
        });
        
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
   
  getPhotoUrl() {
    return this.photoUrl;
  }
}
