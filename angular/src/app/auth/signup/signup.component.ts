import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { auditTime } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ControlService } from 'src/app/service/control.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate!: Date;

  private controlService: ControlService = inject(ControlService);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  userFormGroup = new FormGroup({
    firstFormGroup: new FormGroup({
      email: this.controlService.user.email,
      username: this.controlService.user.username,
      password: this.controlService.user.password,
    }),
    secondFormGroup: new FormGroup({
      firstName: this.controlService.user.firstName,
      lastName: this.controlService.user.lastName,
      birthDate: this.controlService.user.birthDate,
      phone: this.controlService.user.phone,
    }),
    thirdFormGroup: new FormGroup({
      personalId: this.controlService.user.personalId,
      drivingLicense: this.controlService.user.drivingLicense,
    }),
    fourthFormGroup: this.controlService.user.address,
  });

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate = new Date(
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    );

    const emailControl =
      this.userFormGroup.controls['firstFormGroup'].controls['email'];
    const usernameControl =
      this.userFormGroup.controls['firstFormGroup'].controls['username'];
    emailControl.valueChanges
      .pipe(auditTime(3000))
      .subscribe((email: string | null) => {
        if (emailControl.valid) {
          this.userService.isEmailUsed(email!).subscribe((isUsed) => {
            if (isUsed) emailControl.setErrors({ emailUsed: true });
          });
        }
      });

    usernameControl.valueChanges
      .pipe(auditTime(3000))
      .subscribe((username: string | null) => {
        if (usernameControl.valid) {
          this.userService.isUsernameUsed(username!).subscribe((isUsed) => {
            if (isUsed) usernameControl.setErrors({ usernameUsed: true });
          });
        }
      });
  }

  onSubmit() {
    let newUser: User = Object.assign({
      id: '',
      ...this.userFormGroup.value.firstFormGroup,
      ...this.userFormGroup.value.secondFormGroup,
      ...this.userFormGroup.value.secondFormGroup,
      ...this.userFormGroup.value.thirdFormGroup,
      address: Object.assign(this.userFormGroup.getRawValue().fourthFormGroup),
      orders: [],
      favourites: [],
    });

    newUser = {
      ...newUser,
      birthDate: new Date(newUser.birthDate).toISOString(),
    };

    this.userService.add(newUser).subscribe((user) => {
      this.controlService.openSnackBar('Sikeres regisztráció', 2);
      setTimeout(() => {
        if (this.authService.getUser().value) {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/login']);
        }
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.userFormGroup.reset();
  }
}
