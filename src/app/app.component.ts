import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  // pass title to app.component.html
  template: `
    <main>
      <header class="brand-name">
        <img
          class="brand-logo"
          src="/assets/logo.svg"
          alt="logo"
          aria-hidden="true"
        />
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
//   <h1>{{ title }}</h1>
export class AppComponent {
  title = 'Angular';
  // title is a property of AppComponent
}

// Path: src\app\app.component.html
// SHift + Alt + F = Format code by prettier
