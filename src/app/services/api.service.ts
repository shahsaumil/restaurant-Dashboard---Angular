import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  // get,post,delete
  //create rest using post
  postRest(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{return res;}))
  }

  //get rest
  getRest(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{return res;}))

  }

  //update
  updateRes(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{return res;}))
  }

  //delete
  delRes(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{return res;}))
  }

  
}
