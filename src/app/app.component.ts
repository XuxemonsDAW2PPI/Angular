import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
logout() {
  this.router.navigate(['/login']);
}
  title = 'ServicesPractica';
  currentRoute: string;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) { // Esta comprobación garantiza que el tipo es correcto.
        this.currentRoute = event.url;
      }
    });
  }
}



