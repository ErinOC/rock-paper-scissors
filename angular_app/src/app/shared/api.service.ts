import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData } from './interfaces';

// TODO_REFACTOR: Add ApiInterceptor 
const baseUrl = 'http://127.0.0.1:8000';

interface IUserDetails {
  name: string;
}

interface IUserUpdate {
  user_score: number;
  opponent_score: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(email: string): Observable<any> {
    return this.http.get<IUserData>(
      `${baseUrl}/users/${email}`,
    )
  }

  public createUser(payload: IUserDetails) {
    return this.http.post(
      `${baseUrl}/users/`,
      payload
    )
  }

  // TODO_REFACTOR: Use ID instead of email.
  public updateUser(payload: IUserUpdate) {
    return this.http.patch(
      `${baseUrl}/users/`,
      payload
    )
  }
}
