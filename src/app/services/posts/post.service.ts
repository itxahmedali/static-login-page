import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private endpoint = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  loadPosts(link:string) {
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
