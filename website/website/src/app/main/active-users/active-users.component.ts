import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketUser} from "../../types/user";
import {Observable, of} from "rxjs";
import {SocketService} from "../../services/socket.service";
import { Message } from "../../types/message";
import {Element} from "@angular/compiler";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit{
  users?: SocketUser[];
  currentUserName?: string;

  @Output() resetMessagesEvent = new EventEmitter<Message[]>();

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.currentUserName = localStorage.getItem("userName")!;

    this.socketService.fromEvent("getUsers").subscribe((value) => {
      console.log("value: ", value);

      this.users = value.filter((usrs: any) => {
        if(usrs.userName !== this.currentUserName){
          return usrs;
        }
      });
    });
  }

  clickedOnUser(userName: string) {
    let roomName = "";
    if(this.currentUserName?.localeCompare(userName)! > 0){
      roomName = userName + "~" + this.currentUserName;
    } else {
      roomName = this.currentUserName + "~" + userName;
    }

    this.socketService.sendMessage("leaveRoom", roomName);

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

}
