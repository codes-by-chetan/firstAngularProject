import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { UserService } from '../../services/userService/user.service';
import { LoggedUser, RegistrationResponse, User, UserDetails } from '../../interface/user';
import { json } from 'stream/consumers';
import { format } from 'path';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>();
  @Input() IsLoginChecked: boolean = false;
  userService = inject(UserService);

  loggedUser!: LoggedUser | boolean;
  loginMessage = '';
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('User'),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  async submitLogin() {
    const authres = await this.userService.Authenticate(
      this.loginForm.value.userName ?? '',
      this.loginForm.value.password ?? ''
    );
    if (authres.result) {
      this.loggedUser = authres.loggedUser ?? false;
      this.loginMessage = authres.message;
    } else {
      this.loginMessage = authres.message;
    }
    alert(this.loginMessage);
    this.loginEvent.emit(authres.result);
    localStorage.setItem('loginDetails', JSON.stringify(authres));
    console.log(this.loggedUser);
  }

  async submitSignUp() {
    console.log(this.signUpForm.value, this.signUpForm.valid);
    let newUserDetails= {
      userName: this.signUpForm.value.userName ?? '',
      password: this.signUpForm.value.password ?? '',
      type: this.signUpForm.value.type ?? '',
      email: this.signUpForm.value.email ?? '',
      firstName: this.signUpForm.value.firstName ?? '',
      lastName: this.signUpForm.value.lastName ?? '',
    };
    const response: RegistrationResponse = await this.userService.AddNewUser(newUserDetails);
    if  (response.result == true){
      alert(response.message)
      this.IsLoginChecked = true;
    } else{
      alert(response.message)
    }
  }

  
}
