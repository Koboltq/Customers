import {NgModule, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Http, Response,Request,RequestOptions,RequestMethod, Headers}  from '@angular/http'
import {Observable} from 'rxjs/Observable';
import {ICustomers } from '../../models/customer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class CustomersService {
    private _url: string = 'http://localhost:5555/customers';

    constructor(private http: Http) {}

    getCustomers() : Observable<ICustomers[]> {
        return this.http.get(this._url).map((response: Response) => <ICustomers[]>response.json())
        .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }

    addCustomer(body: Object) : Observable<ICustomers[]> {

        let bodyString = JSON.stringify(body);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.post(this._url, body,options)
        .map((res:Response)=>res.json())
        .catch((error:any) =>Observable.throw(error.json().error || 'Server error'));      
    }

    updateCustomer (body:Object) : Observable<ICustomers[]> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this._url + '/' + body['id'],body,options)
        .map((res:Response) =>res.json())
        .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }

    removeCustomer(id:string) : Observable<ICustomers[]> {
        return this.http.delete(this._url + '/' + id)
        .map((res:Response) => res.json())
        .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }
}