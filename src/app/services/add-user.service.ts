import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  baseUrl = 'http://localhost:3000';

  user: any;
  constructor(
    private http: HttpClient
  ) { }

  register(userData) {
    return this.http.post(this.baseUrl + '/users', userData);
  }

  login(req) {
    return this.http.get(this.baseUrl + '/users?userName=' + req.userName + '&password=' + req.password);
  }

  setUserData(user) {
    this.user = user;
  }
  getUserData() {
    return this.user;
  }

}
