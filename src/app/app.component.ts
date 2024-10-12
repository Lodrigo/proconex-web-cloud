import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from './shared/guards/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'Proconex-Cloud';
  isIframe = false;
  loginDisplay = false;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router,) {
    this.authService.initAuth();
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    // if(this.isAuthenticated) {
    //   this.router.navigate(['/home']);
    // }
  }

  ngOnDestroy(): void {
    this.authService.ngOnDestroy();
  }
}
