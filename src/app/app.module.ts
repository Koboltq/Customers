import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

/*Services*/
import { CustomersService } from '../app/services/CustomersService/Customers.service';
import { EmitterService} from '../app/services/EmitterService/Emitter.service';
import { WeatherService} from '../app/services/WeatherService/Weather.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    UpdateCustomerComponent,
    NavComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: "customers", component: HomeComponent},
      {path: "customer", component: CustomerComponent},
      {path: "customer/:id", component: CustomerComponent},
      {path: "updateCustomer/:id", component: UpdateCustomerComponent},
      {path: "404", component: NotFoundComponent},
    ])
  ],
  providers: [
    CustomersService,
    EmitterService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
