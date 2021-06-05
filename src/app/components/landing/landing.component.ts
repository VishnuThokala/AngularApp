import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  showLoginUI: boolean;
  constructor(private _authService:AuthService,private _router:Router) { }

  ngOnInit(): void {
    
    if (this._authService.canActivate()) {
      this._authService.setUser();
     this._router.navigate(['/home'])
    } else {
      this.showLoginUI = this._authService.showLoginUI
    }

    
  }

}
