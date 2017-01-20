import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, Observable} from "rxjs";

@Injectable()
export class LayoutService {

  private playlist_vis:Subject<boolean> = new BehaviorSubject(false);
  private sidenav_vis:Subject<boolean> = new BehaviorSubject(false);
  private notifications:Subject<any> = new Subject();

  constructor() { }


  public updatePlaylistVis(value: boolean) {
    this.playlist_vis.next(value);
  }

  public getPlaylistVis(): Subject<boolean> {
    return this.playlist_vis;
  }

  public updateSidenavVis(value: boolean) {
    this.sidenav_vis.next(value);
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
