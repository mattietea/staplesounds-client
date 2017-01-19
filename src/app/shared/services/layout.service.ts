import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, Observable} from "rxjs";

@Injectable()
export class LayoutService {

  private playlistVis:Subject<boolean> = new BehaviorSubject(false);
  private notifications:Subject<any> = new Subject();

  constructor() { }


  public updatePlaylistVis(value: boolean) {
    this.playlistVis.next(value);
  }

  public getPlaylistVis(): Subject<boolean> {
    return this.playlistVis;
  }

  public buildNotification(message: string, type: string) {
    this.notifications.next({"message": message, "type": type});
  }

  public getNotifications(): Observable<any> {
    return this.notifications;
  }
}
