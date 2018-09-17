import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {ActivatedRoute,Router} from '@angular/router';
import { ICustomers } from 'app/models/customer';
import {CustomersService} from '../services/CustomersService/Customers.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  id:number;
  customer : ICustomers;
  customers = [];
  weather = {};
  exist = false;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private router: Router, private route: ActivatedRoute, private http:Http,
  private _customersService: CustomersService ) { }
  

  
  updateCustomer(customer) {
    
    if(this.customer.gender == "man")
      this.customer.image = './assets/icon8-man.png'
    else
      this.customer.image = './assets/icon8-woman.png';
    this._customersService.updateCustomer(customer).toPromise()
    .then(() => {
      this.router.navigate(['/customers']);
    })
  }

  getWeather(city) {
    // const url = "https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city.toString()+"') and u='c'&format=json";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city.toString()+"&APPID=73455d85dad4656f21ade8abebe0490d&units=metric";
    this.http.get(url).subscribe(
      (res:Response) => {
        this.weather = res.json();

        this.weather = {
            "temp": this.weather["main"].temp,
            "image": 'http://openweathermap.org/img/w/'+this.weather["weather"][0].icon+'.png'
        };
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      this.id = +params['id'];
    });

    this.http.get("http://localhost:5555/customers").subscribe(
      (res: Response) => {
        this.customers = res.json();
        for(var i = 0; i < this.customers.length; i++) {
          if(parseInt(this.customers[i].id) === this.id) {
            this.customer = this.customers[i];
            this.exist = true;
            this.getWeather(this.customers[i].city);
            break;
          }
        }
      }
    );
  }

}
