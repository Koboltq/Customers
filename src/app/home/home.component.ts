import { Component, OnInit,Input, OnChanges } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {CustomersService} from '../services/CustomersService/Customers.service';
import {EmitterService} from '../services/EmitterService/Emitter.service';
import {ICustomers} from '../models/customer';


@Component({
  selector: 'app-customers',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  customers: ICustomers[];
  @Input() public listId: string;
  @Input() editId: string;
  constructor(private _customersService: CustomersService) {

  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this._customersService.getCustomers()
    .subscribe(
      customers => this.customers = customers,
      err => {
        console.log(err);
      });
  }

  ngOnChanges(changes : any) {
    EmitterService.get(this.listId).subscribe((customers: ICustomers[]) => {this.loadCustomers()});
  }

  deleteCustomer(id : string) {
    this._customersService.removeCustomer(id).subscribe(
      customer => { EmitterService.get(id).emit(customer); 
      },
      err => {
        console.log(err);
      });
  }
    
}
