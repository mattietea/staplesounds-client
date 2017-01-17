import {Injectable} from '@angular/core';
import {Song} from "../models/song";
import {Subject} from "rxjs";
import {isNullOrUndefined} from "util";
import {LayoutService} from "./layout.service";

@Injectable()
export class PlayerService {

  private current_playlist: boolean;
  private page_playlist: Array<Song> = [];
  private user_playlist: Array<Song> = [];
  private current_song_index: number;
  private current_song: Subject<Song> = new Subject();

  constructor(private _layoutService: LayoutService) {
  }

  public setCurrentSong(index: number, playlist: boolean): void {
    this.current_song_index = index;
    this.current_playlist = playlist;
    if (playlist === false) {
      if (!isNullOrUndefined(this.page_playlist[index])) {
        this.current_song.next(this.page_playlist[index]);
      }
    } else {
      if (!isNullOrUndefined(this.user_playlist[index])) {
        this.current_song.next(this.user_playlist[index])
      }
    }
  }

  public getCurrentSong() {
    return this.current_song;
  }

  public getNextSong() {
    this.setCurrentSong(this.current_song_index += 1, this.current_playlist);
  }

  public getPreviousSong() {
    this.setCurrentSong(this.current_song_index -= 1, this.current_playlist);
  }

  public setPagePlaylist(playlist: Array<Song>): void {
    this.page_playlist = playlist;
  }

  public getUserPlaylist() {
    return this.user_playlist;
  }

  public addToUserPlaylist(song: Song) {
    let exists = false;
    let index = null;

    this._layoutService.updatePlaylistVis(true);

    for (let i = this.user_playlist.length; i--;) {
      if (this.user_playlist[i] === song) {
        exists = true;
        index = i;
      }
    }

    if (!exists) {
      this.user_playlist.push(song);
    } else {
      this.removeFromUserPlaylist(index);
    }
  }

  public removeFromUserPlaylist(index: number) {
    this.user_playlist.splice(index, 1);

    if(this.user_playlist.length == 0) {
      this._layoutService.updatePlaylistVis(false);
    }
  }

}
