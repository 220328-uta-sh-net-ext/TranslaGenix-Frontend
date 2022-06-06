import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  goToHome(){
    console.log("hatr")
    this.router.navigate(["home"])
  }
  constructor(public nav: NavbarService,private router:Router) { }

  ngOnInit(): void {
  }

}
