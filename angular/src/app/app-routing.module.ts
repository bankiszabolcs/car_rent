import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CarEditComponent } from './pages/car-edit/car-edit.component';
import { CarsComponent } from './pages/cars/cars.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PersonalsComponent } from './pages/personals/personals.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UsersComponent } from './pages/users/users.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AuthGuardService } from './guards/auth.guard';
import { UserAuthGuardService } from './guards/userAuth.guard';
import { OrderAuthGuardService } from './guards/orderAuth.guard';
import { PersonalAuthGuardService } from './guards/personalAuth.guard';
import { OrdersByUserComponent } from './pages/orders-by-user/orders-by-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cars', component: CarsComponent },
  {
    path: 'cars/:id',
    component: CarEditComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  {
    path: 'users/:id',
    component: UserEditComponent,
    canActivate: [UserAuthGuardService],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders/:id',
    component: OrderEditComponent,
    canActivate: [OrderAuthGuardService],
  },
  {
    path: 'orders/user/:id',
    component: OrdersByUserComponent,
    canActivate: [UserAuthGuardService],
  },
  {
    path: 'personals',
    component: PersonalsComponent,
    canActivate: [PersonalAuthGuardService],
  },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
