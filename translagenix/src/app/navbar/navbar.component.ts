import { Component, Inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
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
  constructor(public nav: NavbarService,private router:Router, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
  ngOnInit(): void {
  }

}
