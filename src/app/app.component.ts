import { Component } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
