import { Injectable } from '@angular/core';
import {UtilityService} from "./utility.service";
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {API_ENDPOINT} from "../utilities/constants";
import {HEADER} from "../utilities/requests";
import {Song} from "../models/song";
import {SessionService} from "../authentication/session.service";
import {PlayerService} from "./player.service";

@Injectable()
export class SongService {

  private discover_songs:Subject<Array<Song>> = new Subject();

  constructor(private _http: Http, private _utilityService: UtilityService, private _sessionService: SessionService, private _playerService: PlayerService) { }

  public setDiscoverSongs(genres?: Array<string>) {
    this.getSongsByGenre(genres).subscribe(
      res => {
        this.discover_songs.next(res.json());
        this._playerService.setPagePlaylist(res.json());
      },
      err => console.log(err)
    )
  }

  public getDiscoverSongs(): Subject<Array<Song>> {
    return this.discover_songs
  }

  public getSongs(filter?: Object): Observable<any> {
    let url = this._utilityService.getUrl(`${API_ENDPOINT}Songs`, filter);
    return this._http.get(url, {headers: this._sessionService.buildHeader()}).map(res => res.json())
        .catch(err => Observable.throw(err));
  }

  public getSong(id: number): Observable<any> {
    let url = `${API_ENDPOINT}Songs/${id}`;
    return this._http.get(url, {headers: this._sessionService.buildHeader()}).map(data => data.json())
      .catch(err => Observable.throw(err));
  }

  public getSongsByGenre(genres: Array<string>): Observable<any> {
    let url = `${API_ENDPOINT}Songs/findByGenre?genres=${JSON.stringify(genres)}`;
    return this._http.get(url, {headers: this._sessionService.buildHeader()})
      .catch(err => Observable.throw(err));
  }

  public incSongRank(id: string, val: number): Observable<any> {
    let url = `${API_ENDPOINT}Songs/${id}`;
    let query = {$inc: {rank: val} };
    return this._http.put(url, JSON.stringify(query),{headers: this._sessionService.buildHeader()}).map(data => data.json())
      .catch(err => Observable.throw(err));
  }

  public postSong(song: Song): Observable<any> {
    let url = `${API_ENDPOINT}Songs`;
    return this._http.post(url, song, {headers: this._sessionService.buildHeader()}).map(data => data.json())
      .catch(err => Observable.throw(err));
  }

  public putSong(song: Song): Observable<any> {
    let url = `${API_ENDPOINT}Songs/${song.id}`;
    return this._http.put(url, song, {headers: this._sessionService.buildHeader()}).map(data => data.json())
      .catch(err => Observable.throw(err));
  }

}
