import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { NavbarService } from '../navbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
    localStorage.setItem("userId","");
  }
  public email$!: Observable<string>;
  userId:string="";
  userdata: Observable<any[]> = new Observable<any[]>();
  constructor(public nav: NavbarService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,private _okta:OktaAuthStateService,private user:UserService) { }

  async ngOnInit(): Promise<void> {
    this.nav.show();
    this.email$ = this._okta.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.email ?? '')
    );
  const emailid = (await this._oktaAuth.getUser()).email;
   console.log(emailid);
    this.user.getUserData(emailid);
    this.userdata=this.user.subject;

  this.userdata.forEach(element => {
	//	this.userdata = (Array.from(Object.values(element))[0]).toString();
    //console.log(this.userdata);
   this.userId =(Array.from(Object.values(element))[0]).toString();
   localStorage.setItem("userId",this.userId);
  });

  }
  

}
