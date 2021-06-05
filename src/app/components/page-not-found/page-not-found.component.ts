import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  onClick() {
    this._router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }
}
