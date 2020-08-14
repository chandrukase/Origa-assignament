import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {

  }

  getData(){
    return new Promise((resolve)=>{

      this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res:any)=>{
        resolve(res)
      })
    })
  }
}
