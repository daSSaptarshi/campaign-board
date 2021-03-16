import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
      email : new FormControl("", [Validators.email, Validators.required]),
      password : new FormControl("", [Validators.required])
    }
  )

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitLoginForm()
  {
    this.userService.signinUser(this.loginForm.value)
  }

}
