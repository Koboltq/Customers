import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {ActivatedRoute,Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  id:number;
  customer = {};
  customers = [];
  weather = [];
  customertObj:Object = {};
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private router: Router, private route: ActivatedRoute, private http:Http) { }
  

  
  updateCustomer(customer) {
    this.customertObj = {
      "name": customer.name,
      "surname": customer.surname,
      "city": customer.city,
      "country":customer.country,
      "gender": customer.gender
    };

    const url = "http://localhost:5555/customers/"+this.id.toString();
    this.http.put(url, JSON.stringify(this.customertObj), {headers:this.headers})
    .toPromise()
    .then(()=>{
      this.router.navigate(['/'])
    });
  }

  getWeather(city) {
    // const url = "https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city.toString()+"') and u='c'&format=json";
    const url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city.toString()+'%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    this.http.get(url).subscribe(
      (res:Response) => {
        console.log("city " + city);
        this.weather = res.json();
        console.log(this.weather);
        console.log(this.weather['temp']);
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
            this.getWeather(this.customers[i].city);
            break;
          }
        }
      }
    );
  }

}
