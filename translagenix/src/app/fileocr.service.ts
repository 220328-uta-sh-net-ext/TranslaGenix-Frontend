import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileocrService {

  baseApiUrl = "https://ENDPOINT.cognitiveservices.azure.com/vision/v3.2/ocr"
  
  // Returns an observable
  upload(file:File):Observable<any> {
    // Make http post request over api
    return this.http.post(this.baseApiUrl, file, {headers: {'Content-Type':'application/octet-stream',
    'Ocp-Apim-Subscription-Key': 'PUT_YOU_KEY_HERE'}})
  }
  constructor(private http:HttpClient) { }
}