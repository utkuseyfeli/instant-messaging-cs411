import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService, private router: Router, private socketService: SocketService) {
  }

  logOut(): void {
    this.socketService.disconnect();

    this.authService.logout()
      .subscribe((loggedOut: boolean) => {
        this.router.navigate(["/login"]);
      });
  }
}
