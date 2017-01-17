import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs";
import {Headers} from "@angular/http";

@Injectable()
export class SessionService {

  private session_status:Subject<any> = new BehaviorSubject<any>(false);
  private current_user:any;

  constructor() { }

  public checkUserSession() {
    let storage = localStorage.getItem('current_user');
    if (storage) {
      this.startUserSession(JSON.parse(storage));
    } else {
      this.endUserSession();
    }
    return this.session_status;
  }

  public startUserSession(res) {
    localStorage.setItem('current_user', JSON.stringify(res));
    this.current_user = res;
    this.session_status.next(true);
  }

  public endUserSession() {
    localStorage.removeItem('current_user');
    this.session_status.next(false);
    this.current_user = null;
  }

  public getCurrentUser() {
    return this.current_user;
  }

  public buildHeader() {
    let user = this.getCurrentUser();
    let header = new Headers({
      'Content-Type': 'application/json'
    });
    if (user) {
      header.append('Authorization', user.id);
      return header;
    } else {
      return header;
    }
  }
}
