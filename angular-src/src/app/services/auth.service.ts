import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient} from '@angular/common/http';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;

  constructor(private http:HttpClient) { 

  }
  //making the function so we can use it on register.component.ts
  registerUser(user){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers:headers});
  }
  authenticateUser(user){ 
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers:headers});
  }
  storeUserData(token,user){
    localStorage.setItem("id_token",token);
    localStorage.setItem("user",JSON.stringify(user));
    this.authToken = token;
    this.user = user; 
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  //adding headers to the request and sending it to the profile route at the backend
  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization",this.authToken);
    return this.http.get('http://localhost:3000/users/profile',{headers:headers});
  }
  loadToken(){
    this.authToken = localStorage.getItem("id_token");
  }

}
