import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class AdminService {
	headers : Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  add(request) {
  	return this.http.post(environment.serviceUrl + request.path, request.data, {
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
