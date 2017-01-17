import {Component, OnInit, Input} from '@angular/core';
import {Song} from "../../shared/models/song";
import {PlayerService} from "../../shared/services/player.service";
import {Router} from "@angular/router";
import {SongService} from "../../shared/services/song.service";
import {Observable} from "rxjs";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  @Input() song:Song;
  @Input() index:number;

  constructor(private _playerService: PlayerService, private _songService: SongService, private _userService: UserService) { }

  ngOnInit() {
  }

  setCurrentSong() {
    this._playerService.setCurrentSong(this.index, false);
    this.incSongRank(1)
  }

  addToUserPlaylist() {
    this._playerService.addToUserPlaylist(this.song);
  }

  addToFavorites() {
    this._userService.addToFavorite(this.song).subscribe(
      res => console.log(this.song.title + " added"),
      err => console.log(err)
    );
  }

  incSongRank(val: number) {
    this._songService.incSongRank(this.song.id, val).subscribe(
      err => console.log(Observable.throw(err))
    );
  }

}
