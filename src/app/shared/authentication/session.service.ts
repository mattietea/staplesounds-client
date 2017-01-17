import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Headers} from "@angular/http";
import {isNullOrUndefined} from "util";

@Injectable()
export class SessionService {

  private session_broken:Subject<boolean> = new BehaviorSubject<boolean>(false);
  private current_user:any;
  private session_status:Subject<any> = new BehaviorSubject<any>({ admin: false, authed: false });


  constructor() {}

  public getUserSession() {
    this.checkUserSession();
    return this.session_status;
  }

  public checkUserSession(){
    let storage = localStorage.getItem('current_user');
    if (!isNullOrUndefined(storage)) {
      this.startUserSession(JSON.parse(storage));
    } else {
      this.endUserSession();
    }
  }

  public startUserSession(res) {
    localStorage.setItem('current_user', JSON.stringify(res));
    this.current_user = res;
    this.session_status.next({ admin: res.user.admin, authed: true });
  }

  public endUserSession() {
    localStorage.removeItem('current_user');
    this.session_status.next({admin: false, authed: false});
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
