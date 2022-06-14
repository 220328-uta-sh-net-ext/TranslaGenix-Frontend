import { Component, Inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
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
  public name$!: Observable<string>;
  constructor(public nav: NavbarService,private router:Router, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,private _okta:OktaAuthStateService) { }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
  ngOnInit(): void {
    this.name$ = this._okta.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }

}
