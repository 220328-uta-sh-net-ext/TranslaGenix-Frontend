import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearningWordsService {

  constructor(private http:HttpClient)
  {
    
  }
  
  Word:any[]=[];

  subject:Subject<any[]> = new Subject<any[]>();

  getRandomWord(): void{
   
    this.http.get<any[]>("https://translagenix.azurewebsites.net/api/Words/GetRandomWord")
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

  addPointstoUser(userID: string): void{
    
    this.http.put("https://translagenix.azurewebsites.net/api/Points/IncreasePointsById?id=" +userID, {})
    .pipe(
      catchError((e) => {
        return throwError(e)
      }),
      )
      .subscribe((data) =>{
        console.log(data);
       
      })
  }
}
