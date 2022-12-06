import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): any{
    let val: string | null = sessionStorage.getItem("isUserLoggedIn");

    if(val != null && val == "true"){
      if(url == "/login")
        this.router.parseUrl('/main');
      else
        return true;
    } else {
      return this.router.parseUrl("/login");
    }
  }

}
