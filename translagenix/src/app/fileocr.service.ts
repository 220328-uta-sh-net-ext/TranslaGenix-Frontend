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
    'Ocp-Apim-Subscription-Key': '695fc6b215304ff0b6b4abb2c2e94c13'}})
  }
  fromUrl(url:string):Observable<any>{
    return this.http.post(this.baseApiUrl, {url}, {headers: {'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key': '695fc6b215304ff0b6b4abb2c2e94c13'}})
  }
baseTranslateUrl = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to="

  translation(text:string, endLanguageCode:string):Observable<any>{
    return this.http.post(this.baseTranslateUrl+endLanguageCode, [{text}], {headers: {'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key': '2bdb61806fb34c30bf1a6d9a785d5739', "Ocp-Apim-Subscription-Region":"eastus"}})
  }
  constructor(private http:HttpClient) { }
}