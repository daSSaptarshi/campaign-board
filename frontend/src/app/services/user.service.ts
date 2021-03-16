import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "/profile";
  private urls = {
    register : '/register',
    signin : '/signin',
    details : '/details'
  }
  private isLoggedIn = false;

  httpService;

  constructor(public httpservice : HttpClient, private router:Router ) {
    this.httpService = httpservice;
   }

  registerUser(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.register}`, data);
  }

  signinUser(data)
  {
    this.httpservice.post(`${this.baseUrl}${this.urls.signin}`, data)
    .subscribe((data) =>
    {
      this.router.navigate(['/posts']);
      sessionStorage.setItem("email", data["username"])
      sessionStorage.setItem("userId", data["id"])
      sessionStorage.setItem("isAdmin", data["isAdmin"])
      
    });
  }

  signoutUser()
  {
    this.router.navigate(['/login']);
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("isAdmin")
  }

  getUserDetails(userId)
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.details}/${userId}`);
  }

  setIsLoggedIn(value)
  {
    this.isLoggedIn = value
  }

  getIsLoggedIn()
  {
    console.log(this.isLoggedIn)
    return this.isLoggedIn
  }
}
