import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ControlService } from 'src/app/service/control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private controlService: ControlService
  ) {}

  onSubmit(form: NgForm) {
    const personLog = form.value;
    this.authService.login(personLog).subscribe({
      next: () => {
        this.controlService.openSnackBar('Sikeres bejelentkezés', 2);
        setTimeout(() => {
          this.router.navigate(['personals']);
        }, 2000);
      },
      error: (err) => {
        this.controlService.openSnackBar(err.message, 2);
      },
    });
  }
}
