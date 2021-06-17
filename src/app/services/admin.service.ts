import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
    
  }
  getData(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
  }

}
