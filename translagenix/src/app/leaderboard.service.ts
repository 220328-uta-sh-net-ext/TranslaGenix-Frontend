import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  Word:any[]=[];

  subject:Subject<any[]> = new Subject<any[]>();

  getRandomWord(): void{
   
    this.http.get<any[]>("https://translagenix.azurewebsites.net/api/Points/GetLeaderboard")
    .pipe(
      catchError((e) => {
        return throwError(e)
      }),
    )
    .subscribe((data) =>{
      console.log(data);
      this.Word= data;
      this.subject.next(this.Word);
    })
  }


  constructor(private http:HttpClient)
  {
    
  }
}
