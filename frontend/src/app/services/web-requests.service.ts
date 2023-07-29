import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {
  readonly rootUrl: string;

  constructor(private http: HttpClient) {
    this.rootUrl = "https://backend.konstantinedatunishvili.com";
  }

  public get(url: string) {
    return this.http.get(`${this.rootUrl}/${url}`);
  }

  public post(url: string, payload: Object) {
    return this.http.post(`${this.rootUrl}/${url}`, payload);
  }

  public patch(url: string, payload: Object) {
    return this.http.patch(`${this.rootUrl}/${url}`, payload);
  }

  public delete(url: string) {
    return this.http.delete(`${this.rootUrl}/${url}`);
  }
}
