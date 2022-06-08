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
  fromUrl(url:string):Observable<any>{
    return this.http.post(this.baseApiUrl, {url}, {headers: {'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key': 'PUT_YOU_KEY_HERE'}})
  }
baseTranslateUrl = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to="

  translation(text:string, endLanguageCode:string):Observable<any>{
    return this.http.post(this.baseTranslateUrl+endLanguageCode, [{text}], {headers: {'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key': 'PUT_YOU_KEY_HERE', "Ocp-Apim-Subscription-Region":"eastus"}})
  }
  constructor(private http:HttpClient) { }
}