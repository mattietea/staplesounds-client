import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {isNullOrUndefined} from "util";

@Injectable()
export class LayoutService {

  private current_search_vis: boolean = false;
  private current_sidenav_vis: boolean;
  private playlist_vis:Subject<boolean> = new BehaviorSubject(false);
  private sidenav_vis:Subject<boolean> = new BehaviorSubject(false);
  private search_vis:Subject<boolean> = new BehaviorSubject(false);
  private notifications:Subject<any> = new Subject();

  constructor() { }

  public updateSearchVis(value?: boolean) {
    if (!isNullOrUndefined(value)) {
      this.current_search_vis = value;
      this.search_vis.next(value);
    } else {
      this.current_search_vis = !this.current_search_vis;
      this.search_vis.next(this.current_search_vis)
    }
  }

  getSearchVis(): Subject<boolean> {
    return this.search_vis;
  }

  public updatePlaylistVis(value: boolean) {
    this.playlist_vis.next(value);
  }

  public getPlaylistVis(): Subject<boolean> {
    return this.playlist_vis;
  }

  public updateSidenavVis(value?: boolean) {
    if (!isNullOrUndefined(value)) {
      this.current_sidenav_vis = value;
      this.sidenav_vis.next(value);
    } else {
      this.current_sidenav_vis = !this.current_sidenav_vis;
      this.sidenav_vis.next(this.current_sidenav_vis)
    }
  }

  public getSidenavVis(): Subject<boolean> {
    return this.sidenav_vis;
  }

  public buildNotification(message: string, type: string) {
    this.notifications.next({"message": message, "type": type});
  }

  public getNotifications(): Observable<any> {
    return this.notifications;
  }
}
