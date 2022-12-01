import {Component, OnInit} from '@angular/core';
import {SocketService} from "../services/socket.service";
import {SocketUser} from "../types/user";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.socketService.connect();
    this.socketService.sendMessage("connected", {userName: localStorage.getItem("userName")});
  }
}
