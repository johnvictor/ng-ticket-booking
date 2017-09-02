import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class TheatreService {
  selectedTheatreId: string;
  
	headers : Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getTheareList(request) {
  	return this.http.get(environment.serviceUrl + request.path, {
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

  getSeatDetails(request) {
  	return this.http.get(environment.serviceUrl + request.path, {
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

  bookSeats(request) {
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
