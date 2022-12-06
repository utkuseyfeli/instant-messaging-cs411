import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatScreenComponent} from "./chat-screen/chat-screen.component";
import {MainComponent} from "./main.component";
import {ActiveUsersComponent} from "./active-users/active-users.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { AllUsersComponent } from './all-users/all-users.component';

@NgModule({
  declarations: [
    MainComponent,
    ChatScreenComponent,
    ActiveUsersComponent,
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
