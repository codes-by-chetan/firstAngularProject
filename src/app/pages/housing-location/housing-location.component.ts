import { Component, Input } from '@angular/core';
import { HousingLocation } from '../../interface/housinglocation';
import { addIcons } from "ionicons";
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [JsonPipe, CommonModule, RouterLink],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.scss'
})
export class HousingLocationComponent {
  @Input() housingLocationAttribute!: HousingLocation;

 constructor() {

 }
}
