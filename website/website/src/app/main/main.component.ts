import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../services/socket.service";
import {SocketUser} from "../types/user";
import {Observable, of} from "rxjs";
import {Message} from "../types/message";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  messages: Message[] = [];

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.socketService.connect();
    this.socketService.sendMessage("connected", {userName: sessionStorage.getItem("userName")});
  }

  resetMessages(messages: Message[]){
    this.messages = messages;
  }
}
