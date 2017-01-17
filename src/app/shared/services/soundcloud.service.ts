import { Injectable } from '@angular/core';
import {Song} from "../models/song";
import {Http} from "@angular/http";
import {CLIENT_ID_PARAM} from "../utilities/constants";

@Injectable()
export class SoundCloudService {

  constructor(private _http: Http) { }

  public resolveSong(url: string): Song {
    let song: Song = new Song();
    this._http.get(`https://api.soundcloud.com/resolve?url=${url + CLIENT_ID_PARAM}`)
      .map(response => response.json()).subscribe((data: any) => {
      if (data.streamable) {
        song.url    = data.permalink_url;
        song.title  = data.title;
        song.artist = data.user.username;
        song.audio  = data.stream_url;
        song.image  = this.setImageSize(data.artwork_url);
        if (data.download_url) {
          song.download = data.download_url;
        } else if (data.purchase_url) {
          song.download = data.purchase_url;
        }
      } else {
        song.url = "RIP. Song isn't streamable dawg.";
      }
    }, err => {
      song.url = "RIP. Song isn't streamable dawg.";
    });
    return song;
  }

  private setImageSize(url: string): string {
    if (url != null) {
      return url.replace("large", "t500x500");
    } else {
      return null;
    }
  }

}
