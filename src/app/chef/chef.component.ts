import { Component, OnInit ,HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    this.onLogout();
  }

  constructor( private router: Router,) {

    if(!localStorage.getItem('User')){
      this.router.navigate([ '/signin' ]);
    }

  }
  ngOnInit() {
  }

  onLogout() {
    localStorage.setItem('User', "" );
    this.router.navigate([ '/signin' ]);

  }

}
