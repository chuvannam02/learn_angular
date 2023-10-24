import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  // CommonModule is required for ngIf, ngFor, etc.
  //
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button type="button" class="primary">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  housingLocation:Housinglocation ={
      id:2002,
      name:"Chu Van Nam",
      city:"Ha Noi",
      state:"Viet Nam",
      photo: `${this.baseUrl}/example-house.jpg`,
      availableUnits:10,
      wifi:true,
      laundry:true
  };
}
