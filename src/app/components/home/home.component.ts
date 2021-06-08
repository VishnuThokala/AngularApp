import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import 'jquery'
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageIndex = -1;
  userName = "";
  user: User;
  dp ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ByEDqEXj2RK7wqIx8f6UVFdZ5HSYDIcmyrJ1W80QmGA-bHUT6Xm71bJ9fUQa0ns71dU&usqp=CAU'
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
      // this._authService.setUser();
      this._authService.setUser();
      console.log("HOME INIT ::: this._authService.getUser();", this._authService.getUser());
      var data = this._authService.getUser();
    this.user = new User(data.displayName,
      data.email,
      data.phoneNumber,
      data.password,
      data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
      data.uid,
      data.customerClaims);
      this.user.setUserModel(data.displayName,
      data.email,
      data.phoneNumber,
      data.password,
      data.photoURL || 'https://www.kindpng.com/picc/m/381-3817314_transparent-groups-of-people-png-user-icon-round.png',
        data.uid,
      data.customerClaims);
      console.log("HOME INIT ::: this.user", this.user);

    }

  

  logout() {
    this._authService.logout().subscribe((data) => {
      console.log("data",data);
        if (data!=null) {
        localStorage.clear();
        this._authService.isLoggedIn = false;
          this._router.navigate(['/']).then(() => {
            window.location.reload();
        })
      }
    },
      (err: any) => {
        console.log(err);
      })
  }
  

  setPageIndex(n: number) {
    this.pageIndex = n;
  }

}
