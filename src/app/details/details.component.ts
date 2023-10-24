import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <a [routerLink]="['/']">Back to home</a>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <!-- event handler (submit)="submitApplication()" -->
        <!-- The template now includes an event handler
        (submit)="submitApplication()". Angular uses parentheses syntax around
        the event name to define events in the template code. The code on the
        right hand side of the equals sign is the code that should be executed
        when this event is triggered. You can bind to browser events and custom
        events. -->
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})

//  ?. - optional chaining operator ?
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;
  housingLocation: Housinglocation | undefined;
  housingService: HousingService = inject(HousingService);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    // In Angular, FormGroup and FormControl are types that enable you to build forms.
    // The FormControl type can provide a default value and shape the form data.
    //  In this example firstName is a string and the default value is empty string.
  });

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
      // the nullish coalescing operator ??
      // - trả về giá trị bên phải nếu giá trị bên trái là null hoặc undefined
      // the nullish coalescing ( ?? ) operator is a logical operator
      // that returns its right-hand side operand
      // when its left-hand side operand is null or undefined ,
      //  and otherwise returns its left-hand side operand
    );
  }
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
}

// This component will represent the details page that provides more information on a given housing location.
