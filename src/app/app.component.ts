import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { addIcons } from "ionicons";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { HousingLocationComponent } from "./pages/housing-location/housing-location.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, HousingLocationComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firstAngularApp';
}
