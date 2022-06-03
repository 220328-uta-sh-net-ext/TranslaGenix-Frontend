import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileocrService {

  baseApiUrl = "https://signisight.cognitiveservices.azure.com/vision/v3.2/ocr"
  
  // Returns an observable
  upload(file:File):Observable<any> {
    // Make http post request over api
    return this.http.post(this.baseApiUrl, file, {headers: {'Content-Type':'application/octet-stream',
    'Ocp-Apim-Subscription-Key': 'f6a747b60a05486196eeacc6f1213eb6'}})
  }
  constructor(private http:HttpClient) { }
}