import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUserData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _user = new BehaviorSubject<IUserData>({
    name: null,
    id: null
  });

  public setUser(data: IUserData) {
    this._user.next(data);
  }

  public user$ = this._user;

  constructor() {}
}
