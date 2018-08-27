import { Component, OnInit,Input, OnChanges } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {CustomersService} from '../services/CustomersService/Customers.service';
import {EmitterService} from '../services/EmitterService/Emitter.service';
import {ICustomers} from '../models/customer';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  customers: ICustomers[];
  @Input() public listId: any;
  @Input() editId: string;
  constructor(private _customersService: CustomersService,private router: Router) {

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
    console.log("ngOnChanges");
    EmitterService.get(this.listId).subscribe((customers: ICustomers[]) => {this.loadCustomers()});
  }

  deleteCustomer(id : string) {
    var result = confirm("Are you sure to delete?")
    if(result)
    {
    this._customersService.removeCustomer(id).subscribe(
      customer => { EmitterService.get(id).emit(customer); 
      },
      err => {
        console.log(err);
      });
      this.router.navigate(['/']);
    }  
  }
}
