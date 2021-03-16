import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, public router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.length > 0 && sessionStorage.getItem("userId") != "" && sessionStorage.getItem("userId") !=null) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
      console.log(this.userService.getIsLoggedIn());
      return false;
    }
  }

}
