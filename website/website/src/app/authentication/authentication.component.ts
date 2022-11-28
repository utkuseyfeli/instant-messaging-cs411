import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../types/user";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit{
  private isRegisterEnabled: boolean = false;
  private isWarningOpen: boolean = false;
  hide = true;

  form = this.formBuilder.group({
    userName: '',
    password: ''
  });

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {

  }

  onSubmit() {
    let authInfo = this.form.value;
    this.form.reset();

    let newUser: User = {
      userName: authInfo.userName!,
      password: authInfo.password!
    }

    // register or login
    if(this.isRegisterEnabled){
      console.log("utku");

      this.isWarningOpen = !this.authService.register(newUser);
    }else{
      this.authService.login(newUser)
        .subscribe( (loggedIn: boolean) => {
          if(loggedIn) {
            this.router.navigate(['/main']);
          }
        });
    }

  }

  enableRegister(): void {
    this.isRegisterEnabled = true;
  }

  enableLogin(): void {
    this.isRegisterEnabled = false;
  }

  getIsRegisterEnabled(): boolean {
    return this.isRegisterEnabled;
  }

  closeWarning(): void {
    this.isWarningOpen = false;
  }

  getIsWarningOpen(): boolean {
    return this.isWarningOpen;
  }
}
