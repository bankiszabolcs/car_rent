import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import hu from '@angular/common/locales/hu';
registerLocaleData(hu);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './nav/header/header.component';
import { SidenavListComponent } from './nav/sidenav-list/sidenav-list.component';
import { CarsComponent } from './pages/cars/cars.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarCardComponent } from './pages/cars/car-card/car-card.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { SpinnerOverlayComponent } from './common/spinner-overlay/spinner-overlay.component';
import { PersonalsComponent } from './pages/personals/personals.component';
import { PersonalDatasComponent } from './pages/personals/personal-datas/personal-datas.component';
import { OrderTableComponent } from './common/order-table/order-table.component';
import { OrderDialogComponent } from './common/order-dialog/order-dialog.component';
import { CarActionsComponent } from './common/car-actions/car-actions.component';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';
import { CarEditComponent } from './pages/car-edit/car-edit.component';
import { NamePipe } from './pipes/name.pipe';
import { AdminButtonsComponent } from './common/admin-buttons/admin-buttons.component';
import { AuthenticationInterceptor } from 'src/interceptors/authentication.interceptor';
import { FooterComponent } from './common/footer/footer.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { OrdersByUserComponent } from './pages/orders-by-user/orders-by-user.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    CarsComponent,
    CarCardComponent,
    UsersComponent,
    OrdersComponent,
    UserEditComponent,
    SpinnerOverlayComponent,
    PersonalsComponent,
    PersonalDatasComponent,
    OrderTableComponent,
    OrderDialogComponent,
    CarActionsComponent,
    OrderEditComponent,
    CarEditComponent,
    NamePipe,
    AdminButtonsComponent,
    FooterComponent,
    FaqComponent,
    ContactComponent,
    FilterPipe,
    TranslatePipe,
    OrdersByUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
