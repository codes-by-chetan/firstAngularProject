import { Component, inject } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from "ionicons";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;
  housingLocation!: HousingLocation | undefined;
  housingService: HousingService = inject(HousingService);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  // constructor() {
  //   this.housingLocationId = Number(this.route.snapshot.params["id"]);
  //   this.housingLocation = inject(HousingService).getHousingLocationById(this.housingLocationId);
  // }

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationByIdAsync(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
    console.log(this.applyForm)
  }
}
