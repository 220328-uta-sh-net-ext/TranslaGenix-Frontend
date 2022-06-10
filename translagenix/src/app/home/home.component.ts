import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
  constructor(public nav: NavbarService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.nav.show();
  }
  

}
