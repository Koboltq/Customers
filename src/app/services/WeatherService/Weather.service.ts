import {NgModule, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Http, Response,Request,RequestOptions,RequestMethod, Headers}  from '@angular/http'
import {Observable} from 'rxjs/Observable';
import {Weather } from '../../models/weather';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class WeatherService {
    
    constructor(private http: Http) {}

    getWeather(body: Object) : Observable<Weather[]> {
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+body['city']+"&APPID=73455d85dad4656f21ade8abebe0490d&units=metric";
        return this.http.get(url).map((response: Response) => <Weather[]>response.json())
        .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }
    
}