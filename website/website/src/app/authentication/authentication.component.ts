import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../types/user";
import {concatMap, delay, of} from "rxjs";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit{
  private isRegisterEnabled: boolean = false;
  private isWarningOpen: boolean = false;
  isLoginUnsuccessful: boolean = false;
  isLoginSuccessful: boolean = false;
  isRegisterSuccessful: boolean = false;
  tildeInUserName: boolean = false;
  emptyField: boolean = false;

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
    this.closeTildeWarning();

    let authInfo = this.form.value;
    this.form.reset();

    if (authInfo.userName?.includes("~")){
      this.tildeInUserName = true;
      return;
    }

    if(authInfo.userName === null || authInfo.password === null){
      this.emptyField = true;
      return;
    }

    let newUser: User = {
      userName: authInfo.userName!,
      password: authInfo.password!
    }

    // register or login
    if(this.isRegisterEnabled){
      this.authService.register(newUser)
        .pipe(
          concatMap((value: boolean) => {
            if(value) {
              this.isRegisterSuccessful = value;
              return of(value).pipe(delay(1500));
            }else {
              return of(value);
            }
          })
        )
        .subscribe((value: boolean) => {
          this.isWarningOpen = !value;

          if(value){
            this.router.navigate(['/main']);
          }
        });
    }else{
      this.authService.login(newUser)
        .pipe(
          concatMap((item) => {
            this.isLoginSuccessful = item;
            this.isLoginUnsuccessful = !item;

            return of(item).pipe(delay(1500));
          })
        )
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

  closeTildeWarning(): void {
    this.tildeInUserName = false;
    this.emptyField = false;
    this.isLoginUnsuccessful = false;
  }
}
