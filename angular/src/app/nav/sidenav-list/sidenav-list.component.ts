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
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();

  user!: MinimalUser | null;

  userSubcription!: Subscription;

  showFiller = false;

  constructor(private authService: AuthService, private router: Router) {}

  onClose(): void {
    this.closeSidenav.emit();
  }

  ngOnInit(): void {
    this.userSubcription = this.authService
      .getUser()
      .subscribe((user) => (this.user = user));
  }

  onLogout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
    this.closeSidenav.emit();
  }

  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }
}
