import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  url = "http://localhost:3000/users";

  readonly baseurl = "http://localhost:3000/";
  imageUrl: string = '';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }

  getdata(data: any): Observable<any> {

    return this.http.post(this.baseurl + "users", data);

  }

  getuser(): Observable<any> {
    return this.http.get(this.baseurl + "users");
  }

  // to delete data from json file 
  // deleteuserbyId(ID: any): Observable<any> {
  //   return this.http.delete(this.baseurl + "users/" + ID);
  // }

  geteuserbyId(ID: any): Observable<any> {
    return this.http.get(this.baseurl + "users/" + ID);
  }

}
