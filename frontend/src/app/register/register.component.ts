import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  public isOrg = false;
  registerForm = new FormGroup(
    {
      name : new FormControl("", Validators.required),
      email : new FormControl("", [Validators.email, Validators.required]),
      address : new FormControl("", Validators.required),
      website : new FormControl(""),
      phone : new FormControl("", Validators.required),
      password : new FormControl("", [Validators.required, Validators.minLength(5)])
    }
  )

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  chnangeRole(role)
  {
    this.isOrg = role;
  }

  onSubmitRegisterForm()
  {
    this.userService.registerUser(this.registerForm.value).subscribe((data) =>
    {
      console.log("fvfdv")
      this.router.navigate(['/home']);
      sessionStorage.setItem("email", data["user"]["username"])
      sessionStorage.setItem("userId", data["user"]["id"])
      this.userService.setIsLoggedIn(true);
    })
  }

}
