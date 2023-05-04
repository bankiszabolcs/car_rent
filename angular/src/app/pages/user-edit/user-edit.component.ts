import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { auditTime, Observable, switchMap } from 'rxjs';
import { MinimalUser } from 'src/app/model/minimal-user';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ControlService } from 'src/app/service/control.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  private actRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private controlService: ControlService = inject(ControlService);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);

  user: User | null = null;

  userLogged!: MinimalUser;

  maxDate!: Date;

  admin: boolean = false;

  changePassword: boolean = false;

  userFormGroup: FormGroup = new FormGroup(this.controlService.user);

  changePasswordForm = new FormGroup({
    changePassword: new FormControl(false),
  });

  user$: Observable<User> = this.actRoute.params.pipe(
    switchMap((params) => this.userService.get(params['id']))
  );

  previousPage: string | undefined = undefined;

  constructor() {
    this.previousPage = this.router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.user$.subscribe((user) => {
      this.fillControls(user);
      this.user = user;
    });

    this.switchPasswordInput(false);

    this.changePasswordForm
      .get(['changePassword'])
      ?.valueChanges.subscribe((checked) => {
        this.changePassword = checked;
        if (checked) {
          this.switchPasswordInput(checked);
        } else {
          this.switchPasswordInput(checked);
        }
      });

    this.authService.getUser().subscribe((user) => (this.userLogged = user!));

    const oldPasswordControl = this.userFormGroup.controls['oldPassword'];

    oldPasswordControl.valueChanges
      .pipe(auditTime(3000))
      .subscribe((oldPassword: string | null) => {
        if (oldPasswordControl.valid) {
          this.userService
            .isPasswordCorrect(oldPassword!, this.user?._id!)
            .subscribe((isCorrect) => {
              if (!isCorrect)
                oldPasswordControl.setErrors({ invalidPassword: true });
            });
        }
      });

    this.userFormGroup.setValidators(this.checkPasswords);
  }

  ngOnDestroy(): void {
    this.userFormGroup.reset();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = this.userFormGroup.get('password')?.value;
    let confirmPassword = this.userFormGroup.get('confirmPassword')?.value;

    if (this.changePassword) {
      return password === confirmPassword &&
        this.userFormGroup.get('oldPassword')?.valid
        ? null
        : { notSame: true };
    } else {
      return null;
    }
  };

  fillControls(user: User) {
    Object.keys(this.controlService.user).forEach((key) => {
      if (key === 'address') {
        this.userFormGroup.get([key])?.patchValue({ ...user.address });
      }
      this.userFormGroup.get([key])?.setValue(user[key]);
    });
  }

  switchPasswordInput(switchOn: boolean) {
    if (switchOn) {
      this.userFormGroup.get(['password'])?.enable();
      this.userFormGroup.get(['oldPassword'])?.enable();
      this.userFormGroup.get(['confirmPassword'])?.enable();
    } else {
      this.userFormGroup.get(['password'])?.disable();
      this.userFormGroup.get(['oldPassword'])?.disable();
      this.userFormGroup.get(['confirmPassword'])?.disable();
    }
  }

  onSave(): void {
    const updatedUser = this.userFormGroup.value;
    delete updatedUser.confirmPassword;
    delete updatedUser.oldPassword;

    this.userService.update(updatedUser).subscribe((user) => {
      this.controlService.openSnackBar('Sikeresen módosítottad az adataid!', 1);
      setTimeout(() => {
        this.router.navigate(['..'], { relativeTo: this.actRoute });
      }, 1000);
    });
  }

  onStatusChange() {
    const statusToChange = this.user?.role === 'admin' ? 'user' : 'admin';
    const statusToChangeText =
      statusToChange === 'admin' ? 'admin' : 'felhasználói';
    if (
      confirm(
        `Biztos ${statusToChangeText} jogot állítasz be ${this.user?.username}-nek?`
      )
    ) {
      this.userService
        .update({ ...this.user!, role: statusToChange })
        .subscribe((user) => {
          this.controlService.openSnackBar(
            `Sikeresen ${
              statusToChangeText === 'admin' ? 'admin' : 'felhasználói'
            } jogot adtál ${user.username}-nak`,
            1
          );
          setTimeout(() => {
            this.router.navigate(['/'], { relativeTo: this.actRoute });
          }, 1000);
        });
    }
  }

  onBack(): void {
    if (this.userLogged.role === 'admin') {
      if (this.previousPage === '/users') {
        this.router.navigate(['users']);
      } else {
        this.router.navigate(['personals']);
      }
    } else if (this.userLogged.role === 'user') {
      this.router.navigate(['personals']);
    }
  }
}
