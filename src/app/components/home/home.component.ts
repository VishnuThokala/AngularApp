import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import 'jquery'
import { userError } from '@angular/compiler-cli/src/transformers/util';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageIndex = -1;
  userName = "";
  constructor(private _authService: AuthService,
  private _router:Router
  ) {
    
  }

  ngOnInit(): void {
   
    let btn: HTMLElement | null= document.querySelector("#btn");
    let sidebar: HTMLElement | null = document.querySelector(".sidebar");
    let searchBtn : HTMLElement | null = document.querySelector(".bx-search");
    if (btn && sidebar) {
      btn.onclick = function () {
        if(sidebar)
        sidebar.classList.toggle("active");
      }
    }
    if (searchBtn && sidebar ) {
      searchBtn.onclick = function () {
        if(sidebar)
        sidebar.classList.toggle("active");
      }
    }

    var u = this._authService.getLocalUser();
    if (u) {
      let user=JSON.parse(u)
      this.userName = user.email.slice(0, -10);
    }
  }
  logout() {
    this._authService.logout().subscribe((data) => {
      console.log("data",data);
        if (data!=null) {
        localStorage.clear();
        this._authService.isLoggedIn = false;
        this._router.navigate(['/']);
      }
    },
      (err: any) => {
        console.log(err);
      })
  }
  setPageIndex(n:number) {
    this.pageIndex = n;
  }

  

}
