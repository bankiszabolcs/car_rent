import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  subscription!: Subscription;

  ngOnInit(): void {
    this.getMe();
  }

  @HostListener('click') onClick() {
    if (this.authService.getUser().value !== null) {
      this.subscription = this.authService.refresh().subscribe();
    }
  }

  getMe() {
    if (localStorage.getItem('accessToken')) {
      this.authService.me().subscribe({
        next() {},
        error: () => {
          this.router.navigate([this.router.url]);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
