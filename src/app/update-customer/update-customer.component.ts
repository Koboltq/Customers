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
  weather = {};
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
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city.toString()+"&APPID=73455d85dad4656f21ade8abebe0490d&units=metric";
    this.http.get(url).subscribe(
      (res:Response) => {
        this.weather = res.json();
        console.log(this.weather);
        console.log(this.weather["weather"][0].icon);

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
            this.getWeather(this.customers[i].city);
            break;
          }
        }
      }
    );
  }

}
