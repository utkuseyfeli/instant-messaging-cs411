import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {FormBuilder} from "@angular/forms";
import {concatMap, map, of} from "rxjs";

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit{
  roomName: string = "";
  messages: string[] = [];
  currentUser: string = "";
  messageForm = this.formBuilder.group({
    message: ""
  });

  constructor(private socketService: SocketService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.messageForm.get("message")?.disable();
    this.currentUser = localStorage.getItem("userName")!;

    this.socketService.fromEvent("connectedToRoom")
      .subscribe((roomName: string) => {
        this.messageForm.get("message")?.enable();
        this.roomName = roomName;
      });

    this.socketService.fromEvent("messageToClients")
      .pipe(
        map((message) => {
          if(message.from === this.currentUser){
            return null;
          }else{
            return message;
          }
        })
      )
      .subscribe((messageInfo) => {
        if(messageInfo !== null){
          this.messages.push(messageInfo.message);
        }
      });
  }

  enableChat(): boolean{
    return this.roomName != "";
  }

  onSubmit() {
    let message = this.messageForm.value.message!;
    console.log(message);

    if(typeof(message) === "undefined"){
      return;
    }

    this.socketService.sendMessage("messageToServer", {
      roomName: this.roomName,
      message: message,
      from: this.currentUser
    })

    this.messages.push(message);

    this.messageForm.reset();
  }

  setMessages(messages: string[]): void {
    this.messages = messages;
  }
}
