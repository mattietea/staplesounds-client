import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class LayoutService {

  private playlistVis:Subject<boolean> = new BehaviorSubject(false);

  constructor() { }


  public updatePlaylistVis(value: boolean) {
    this.playlistVis.next(value);
  }

  public getPlaylistVis(): Subject<boolean> {
    return this.playlistVis;
  }
}
