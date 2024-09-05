import { Component , inject} from '@angular/core';
import { addIcons } from "ionicons";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../../interface/housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'Home Page';
  housingService : HousingService = inject(HousingService)
  housingLocationList!: HousingLocation[];
  filteredLocationList: HousingLocation[] = [];
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
  // constructor() {
  //   this.housingLocationList = this.housingService.getAllHousingLocations();
  //   this.filteredLocationList = this.housingLocationList;
  // }

  constructor() {
    this.housingService.getAllHousingLocationsAsync().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
}
