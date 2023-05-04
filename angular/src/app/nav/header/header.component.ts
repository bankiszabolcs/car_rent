import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MinimalUser } from 'src/app/model/minimal-user';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  user!: MinimalUser | null;

  userSubcription!: Subscription;

  myColor: string = 'rgba(100,149,237, 0.2)';

  constructor(private authService: AuthService, private router: Router) {}

  onToggle() {
    this.sidenavToggle.emit();
  }

  ngOnInit(): void {
    this.userSubcription = this.authService
      .getUser()
      .subscribe((user) => (this.user = user));
  }

  onLogout(): void {
    if (confirm('Biztosan kijelentkezel?')) {
      this.authService.logout();
      this.user = null;
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }
}
