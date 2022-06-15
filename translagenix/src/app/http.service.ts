import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "/api/endpoint";
  constructor(private httpClient: HttpClient) { }

  sendGetRequest() {
    return this.httpClient.get(this.apiUrl)
  }

  sendPostRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl, data)
  }


}

