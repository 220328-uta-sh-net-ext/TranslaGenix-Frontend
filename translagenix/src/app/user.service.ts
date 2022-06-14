import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';

type NewType = Subject<any[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient)
  {
  }
  
  user:any[]=[];

  subject:NewType = new Subject<any[]>();

  getUserData(email:any): void{
   console.log(email.toString());
    this.http.get<any[]>("https://translagenix.azurewebsites.net/api/User/GetUserByEmail?email="+email)
    .pipe(
      catchError((e) => {
        return throwError(e)
      }),
    )
    .subscribe((data) =>{
      console.log(data);
      this.user= data;
      this.subject.next(this.user);
    })
  }
}
