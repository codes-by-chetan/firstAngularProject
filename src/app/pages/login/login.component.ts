import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from "ionicons";
import { UserService } from '../../services/userService/user.service';
import { LoggedUser } from '../../interface/user';
import { json } from 'stream/consumers';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>();

  userService = inject(UserService);
  
  loggedUser!: LoggedUser | boolean;
  loginMessage = "";
  loginForm = new FormGroup({
    userName : new FormControl(''),
    password : new FormControl('')
  })
  
  async submitLogin(){
      const authres = await this.userService.Authenticate(
      this.loginForm.value.userName ?? '',
      this.loginForm.value.password ?? ''
    );
    if (authres.result){
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
}
