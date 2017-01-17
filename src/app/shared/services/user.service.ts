import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Observable} from "rxjs";
import {API_ENDPOINT} from "../utilities/constants";
import {Http} from "@angular/http";
import {SessionService} from "../authentication/session.service";
import {Song} from "../models/song";

@Injectable()
export class UserService {

  constructor(private _http: Http, private _sessionService: SessionService) { }

  public signUp(user: User): Observable<any> {
    let url = `${API_ENDPOINT}Accounts`;
    return this._http.post(url, user, { headers: this._sessionService.buildHeader() })
      .map(data => data.json)
      .catch(err => Observable.throw(err));
  }

  public signIn(user: User): Observable<any> {
    let url = `${API_ENDPOINT}Accounts/login?include=user`;
    return this._http.post(url, { email: user.email, password: user.password }, { headers: this._sessionService.buildHeader() })
      .map(data => data.json())
      .catch(err => Observable.throw(err));
  }

  public signOut() {
    let url = `${API_ENDPOINT}Accounts/logout`;
    return this._http.post(url, { headers: this._sessionService.buildHeader() })
      .map(data => data.json)
      .catch(err => Observable.throw(err));
  }

  public addToFavorite(song: Song): Observable<any> {
    let url = `${API_ENDPOINT}Accounts/${this._sessionService.getCurrentUser().user.id}/favorites`;
    return this._http.post(url, song, { headers: this._sessionService.buildHeader() })
      .map(data => data.json)
      .catch(err => Observable.throw(err));
  }

  public getFavorites(filter?: Object): Observable<any> {
    let url = `${API_ENDPOINT}Accounts/${this._sessionService.getCurrentUser().user.id}/favorites`;
    return this._http.get(url, { headers: this._sessionService.buildHeader() })
      .map(data => data.json())
      .catch(err => Observable.throw(err));
  }

}
