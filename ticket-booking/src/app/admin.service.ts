import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class AdminService {
	headers : Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  add(request) {
  	this.http.post("url" + request.path, request.data, {
  		headers: this.headers
  	}).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(
      (error: Response) => {
        return Observable.throw(error);
      }
    );
  }

}
