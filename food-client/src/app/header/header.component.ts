import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isHome = true;
  currentPosition = 0;
  startPosition = 0;
  changePosition = 100;
  user: any;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.state().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.url === '/home' || res.url === '/') {
          this.isHome = true;
        } else {
          this.isHome = false;
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  updateHeader($event) {
    this.currentPosition =
      (window.pageYOffset || $event.target.scrollTop) -
      ($event.target.clientTop || 0);
    if (this.currentPosition >= this.changePosition) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
