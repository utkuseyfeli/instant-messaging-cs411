import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router, RouterEvent} from "@angular/router";
import {SocketService} from "../services/socket.service";
import {concatMap, filter, fromEvent, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userName: string = "";

  constructor(private authService: AuthenticationService, private router: Router, private socketService: SocketService) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        map(() => {
          this.userName = sessionStorage.getItem("userName")!;
        })
      )
      .subscribe();
  }

  logOut(): void {
    this.socketService.disconnect();
    sessionStorage.removeItem("userName");
    this.userName = "";

    this.authService.logout()
      .subscribe((loggedOut: boolean) => {
        this.router.navigate(["/login"]);
      });
  }
}
