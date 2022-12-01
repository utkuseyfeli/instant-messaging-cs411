import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SocketUser} from "../../types/user";
import {Observable, of} from "rxjs";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit{
  users?: SocketUser[];
  currentUserName?: string;

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
    this.socketService.sendMessage("chatWith", {myself: this.currentUserName, other: userName});
  }

}
