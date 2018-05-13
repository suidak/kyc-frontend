import { Component } from '@angular/core';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLoader=false;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);

    });
  }

   _navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      console.log('Navigation start');
      this.showLoader = true;
    }
    if (event instanceof NavigationEnd) {
      console.log('Navigation end');
      this.showLoader = false;
    }

    if (event instanceof NavigationCancel) {
      console.log('Navigation is canceled')
    }
    if (event instanceof NavigationError) {
      console.log('Navigation has error')
    }
  }


}
