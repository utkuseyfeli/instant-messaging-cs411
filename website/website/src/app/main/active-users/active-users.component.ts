import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketUser, User} from "../../types/user";
import {concatMap, Observable, of} from "rxjs";
import {SocketService} from "../../services/socket.service";
import { Message } from "../../types/message";
import {Element} from "@angular/compiler";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit{
  users?: SocketUser[];
  allUsers?: User[];
  currentUserName?: string;

  @Output() resetMessagesEvent = new EventEmitter<Message[]>();

  constructor(private socketService: SocketService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUserName = sessionStorage.getItem("userName")!;

    this.socketService.fromEvent("getUsers").subscribe((value) => {
      console.log("value: ", value);

      this.users = value.filter((usrs: any) => {
        if(usrs.userName !== this.currentUserName){
          return usrs;
        }
      });
    });

    this.authService.getAllUsers()
      .pipe(
        concatMap((users) => {
          this.allUsers = users;
          return of();
        })
      )
      .subscribe();
  }

  clickedOnUser(userName: string): void {
    this.socketService.sendMessage("leaveRoom");

    this.socketService.sendMessage("chatWith", {myself: this.currentUserName, other: userName});
    this.resetMessagesEvent.emit([]);

    let otherUsers = document.getElementsByClassName("other-users");
    Array.from(otherUsers as HTMLCollectionOf<HTMLElement>).filter((user) => {
      if(user.id === userName){
        user.classList.remove("other-users:hover");
        user.classList.add("enabled-user");
      }else {
        user.classList.add("other-users:hover");
        user.classList.remove("enabled-user");
      }
      return;
    });
  }

  tabChanged(): void {
    let otherUsers = document.getElementsByClassName("other-users");
    Array.from(otherUsers as HTMLCollectionOf<HTMLElement>).filter((user) => {
        user.classList.add("other-users:hover");
        user.classList.remove("enabled-user");
      return;
    });

    this.resetMessagesEvent.emit([]);
  }

}
