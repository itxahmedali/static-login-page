import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  getUsers(link:string) {
    // Add a request to get users using `endpoint`
    // Add a request to get posts using `endpoint`
    let header = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : '*',
      Accept: "application/json",

    };
    return this.http.get(
      this.endpoint + link,
      {
        headers: header,
      }
    );
  }
}
