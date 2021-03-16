import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = "/post";
  private urls = {
    create      : `/create`,
    update      : `/update`,
    delete      : `/delete/`,
    getAll      : `/getAll`,
    getAllPending: `/getAllPending`,
    upvote      : `/upvote/`,
    approve     : `/approve/`
  }
  private isLoggedIn = false;

  constructor(public httpservice: HttpClient ) {
   }
  
  getAllPosts()
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getAll}`);
  }

  createNewPost(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.create}`, data);
  }

  upvotePost(postId)
  {
    return this.httpservice.patch(`${this.baseUrl}${this.urls.upvote}${postId}`, {})
  }

  getPendingPosts()
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getAllPending}`);
  }

  approvePost(postId)
  {
    return this.httpservice.patch(`${this.baseUrl}${this.urls.approve}${postId}`, {});
  }
}
