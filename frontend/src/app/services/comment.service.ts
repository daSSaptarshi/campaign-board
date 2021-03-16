import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = "/comment";
  private urls = {
    add         : `/add`,
    getAll      : `/getAll/`
}
  private isLoggedIn = false;

  httpService;

  constructor(public httpservice : HttpClient ) {
    this.httpService = httpservice;
   }

  addComment(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.add}`, data);
  }

  getComments(postId)
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getAll}${postId}`);
  }
}
