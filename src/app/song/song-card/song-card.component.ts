import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Song} from "../../shared/models/song";
import {PlayerService} from "../../shared/services/player.service";
import {Router} from "@angular/router";
import {SongService} from "../../shared/services/song.service";
import {Observable, Subscriber, Observer, Subscription} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {SessionService} from "../../shared/authentication/session.service";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit, OnDestroy {

  //TODO: Unsubscribe after inc song val.

  @Input() song:Song;
  @Input() index:number;
  @Input() horizontal: boolean;
  private is_admin:boolean;
  private session_status_subscription: Subscription;

  constructor(private _playerService: PlayerService, private _songService: SongService, private _userService: UserService, private _sessionService: SessionService) {
    this.session_status_subscription = this._sessionService.getUserSession().subscribe(
      res => {
        this.is_admin = res.admin;
      }
    )
  }

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
      res => console.log("Increased ranking to " + this.song.rank),
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.session_status_subscription.unsubscribe();
  }

}
