import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { addIcons } from "ionicons";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { HousingLocationComponent } from "./pages/housing-location/housing-location.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthenticationResponse } from './interface/user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, HousingLocationComponent, RouterModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firstAngularApp';
  localdata: string|null = `{'result': 'false'}` ;
  loginDetails: AuthenticationResponse = JSON.parse(this.localdata ?? '{"result": "false"}');
  isLoginEnabled = this.loginDetails.result ?? false;
  toggleLogin(toggle: boolean){
    this.isLoginEnabled = !toggle;
    if (this.isLoginEnabled) {
      document.body.style.overflow = 'hidden';  // Disable scrolling
    } else {
      document.body.style.overflow = '';  // Enable scrolling
    }
  }

  constructor(){
    this.localdata = localStorage.getItem('loginDetails');
    
  }
}
