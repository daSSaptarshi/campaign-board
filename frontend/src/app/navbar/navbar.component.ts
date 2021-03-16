import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin = sessionStorage.getItem("isAdmin")
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  signout()
  {
    this.userService.signoutUser();
  }
}
