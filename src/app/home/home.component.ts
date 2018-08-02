import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Component({
  selector: 'router-outlet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) { }
  id:number;
  private headers = new Headers({'Content-Type': 'application/json'});

  customers = [];
  fetchData = function() {
    this.http.get("http://localhost:5555/customers").subscribe(
      (res: Response) => {
        this.customers = res.json();
      }
    );
  }

  deleteCustomer = function(id) {
    if(confirm("Are you sure?")) {
      const url = 'http://localhost:5555/customers/' + id;
      return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(()=> {
        this.fetchData();
      });
    }
  }
    
  ngOnInit() {
    this.fetchData();
  }

}
