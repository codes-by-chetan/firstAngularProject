import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { addIcons } from "ionicons";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { HousingLocationComponent } from "./pages/housing-location/housing-location.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthenticationResponse } from './interface/user';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, HousingLocationComponent, RouterModule, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firstAngularApp';
  
  localdata: any;
  
  // isLoginEnabled = this.loginDetails.result ?? false;
  isLoginEnabled = false;
  isUserLoggedIn = false;
  private isBrowser!: boolean;

  toggleLogin(toggle: boolean, userLogged: boolean){
    this.isLoginEnabled = !toggle;
    this.isUserLoggedIn = userLogged;
    if (this.isLoginEnabled) {
      document.body.style.overflow = 'hidden';  // Disable scrolling
    } else {
      document.body.style.overflow = '';  // Enable scrolling
    }
    
  }
  constructor(@Inject(PLATFORM_ID) private platformId:any) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
        this.localdata = JSON.parse(localStorage.getItem("loginDetails") ?? '{"result":true,"message":"Login Succesfull"}');
    }
    if(this.localdata) {
      this.isUserLoggedIn = this.localdata.result;
    }
    console.log(this.localdata)
  }

}
 

