import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {FormControl,Validators,FormGroup,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  
  constructor(private http: Http) { }

  customer = new FormGroup({
    name: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])),
    surname: new FormControl(""),
    city: new FormControl(""),
    country:new FormControl( ""),
    gender: new FormControl(true),
    image: new FormControl("")
  });

  addNewCustomer = function(customer) {
    this.http.post("http://localhost:5555/customers/", this.customer).subscribe((res:Response)=>{

      customer.image = "../assets/george1.png";

      console.log(customer.image);
      console.log(res);
    })
  }

  ngOnInit() {
  }

}
