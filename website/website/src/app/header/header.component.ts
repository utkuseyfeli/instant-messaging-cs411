import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  logOut(): void {
      this.authService.logout()
        .subscribe((loggedOut: boolean) => {
          this.router.navigate(["/login"]);
        });
  }
}
