import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  { path: "", component: MainComponent, canActivate: [AuthGuard] },
  { path: "login", component: AuthenticationComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
