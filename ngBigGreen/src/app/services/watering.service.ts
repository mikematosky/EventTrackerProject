import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WateringService {

  private baseUrl = 'http://localhost:8084/';
  private url= this.baseUrl+'api/waterings';

  constructor() { }


    //TODO: get, post, put, delete
}
