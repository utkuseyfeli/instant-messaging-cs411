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
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    MainComponent,
    ChatScreenComponent,
    ActiveUsersComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class MainModule { }
