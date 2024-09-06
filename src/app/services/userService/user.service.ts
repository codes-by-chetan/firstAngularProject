import { Injectable } from '@angular/core';
import { User, LoggedUser, AuthenticationResponse } from '../../interface/user';
import { resourceLimits } from 'worker_threads';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users!: User[];
  user!: User;
  loggedUser!: LoggedUser;
  authenticationResponse!: AuthenticationResponse;
  url = 'http://localhost:3000/Users';

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getUserById(id: number): Promise<User[]> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  async getUserByUserName(userName: string): Promise<User[]> {
    const data = await fetch(`${this.url}?userName=${userName}`);
    return (await data.json()) ?? {};
  }
  async Authenticate(userName: string, password: string): Promise<AuthenticationResponse> {
    // this.getUserByUserName(userName).then((user: User) => {
    //   this.user = user;
    //   console.log('user',this.user);

    // });
    const user = await this.getUserByUserName(userName);
    this.user = user[0];

    console.log('this.user',this.user);
    if(this.user && this.user.password === password){
      const{password,...newObject} = this.user;
      this.loggedUser = newObject;
      this.authenticationResponse = {
        result: true,
        message: "Login Succesfull",
        loggedUser: this.loggedUser
      }
      console.log("Authentication Succesfull");
    } else if (this.user && this.user.password != password){
      this.authenticationResponse = {
        result: false,
        message: "Wrong Password",
      }
    } else {
      this.authenticationResponse = {
        result: false,
        message: "User Name does not match",
      }
    }

    return this.authenticationResponse
  };

  // async Authenticate(
  //   userName: string,
  //   password: string
  // ): Promise<LoggedUser | false> {
  //   try {
  //     // Wait for the user data to be fetched
  //     const user = await this.getUserByUserName(userName);
  //     this.user = user[0];
  //     console.log('user', this.user);

  //     // Check the password after the user data is fetched
  //     if (this.user.password === password) {
  //       // Destructure the password out of the user object
  //       const { password, ...newObject } = this.user;
  //       this.loggedUser = newObject;
  //       console.log('User authenticated successfully!');
  //       return this.loggedUser; // Return the loggedUser object if successful
  //     } else {
  //       console.log('Authentication failed: Incorrect password');
  //       return false; // Return false if authentication fails
  //     }
  //   } catch (error) {
  //     console.error('Error during authentication:', error);
  //     return false; // Handle errors and return false in case of failure
  //   }
  // }

  constructor() {}
}
