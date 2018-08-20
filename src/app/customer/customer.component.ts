import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {FormControl,Validators,FormGroup,FormsModule} from '@angular/forms';
import {ICustomers } from '../models/customer';
import {CustomersService} from '../services/CustomersService/Customers.service';
import {Observable} from 'rxjs/Observable';
import {EmitterService} from 'app/services/EmitterService/Emitter.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnChanges {
  customer: ICustomers;
  private editing : boolean = false;
  @Input() editId: string;

  constructor(private _customersService: CustomersService ) {
    this.customer = new ICustomers();
    console.log(this.customer);
   }

  addNewCustomer() {

    let customerOperation:Observable<ICustomers[]>;

    if(!this.editing) {
      customerOperation = this._customersService.addCustomer(this.customer);
    } else {
      customerOperation = this._customersService.updateCustomer(this.customer);
    }
    customerOperation.subscribe(customers => {
      this.customer = new ICustomers();
      if(this.editing) {
        this.editing = !this.editing;
      } 
    },
    err=> {
      console.log(err);
    });

  }

  ngOnChanges() {
    console.log('onchanges');
    console.log(EmitterService.get(this.editId).subscribe((customer : ICustomers) => {
      this.customer = customer,
      this.editing = true;
    }));
  }

}
