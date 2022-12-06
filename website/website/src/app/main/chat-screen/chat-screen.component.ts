import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {FormBuilder} from "@angular/forms";
import {concatMap, first, map, of, Subscription, switchMap} from "rxjs";
import {Message} from "../../types/message";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit{
  roomName: string = "";
  @Input() messages: Message[] = [];
  currentUser: string = "";
  messageForm = this.formBuilder.group({
    message: ""
  });

  constructor(private socketService: SocketService, private formBuilder: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageForm.get("message")?.disable();
    this.currentUser = localStorage.getItem("userName")!;

    this.socketService.fromEvent("connectedToRoom")
      .pipe(
        concatMap((roomName: string) => {
          this.messageForm.get("message")?.enable();
          this.roomName = roomName;
          return this.messageService.getMessagesInRoom(roomName).pipe(first());
        }),
        concatMap((messages) => {
          return this.messages = messages;
        })
      )
      .subscribe();

    this.socketService.fromEvent("messageToClients")
      .pipe(
        concatMap((message) => {
          if(message !== null){
            this.messages.push(message);
            return of(true);
          }
          return of(false);
        }),
        concatMap(val => {
          if(val){
            this.scrollToBottom();
          }
          return of();
        })
      )
      .subscribe();
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

    // firestore service
    this.messageService.pushMessageIntoRoom({
      roomName: this.roomName,
      message: message,
      from: this.currentUser
    });

    this.messageForm.reset();
  }

  setMessages(messages: Message[]): void {
    this.messages = messages;
  }

  scrollToBottom(): void {
    let elem = document.getElementById('messages')!;
    elem.scrollTop = elem.scrollHeight;
  }
}
