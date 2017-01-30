import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Song} from "../../shared/models/song";
import {PlayerService} from "../../shared/services/player.service";
import {Router} from "@angular/router";
import {SongService} from "../../shared/services/song.service";
import {Observable, Subscriber, Observer, Subscription} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {SessionService} from "../../shared/authentication/session.service";
import {LayoutService} from "../../shared/services/layout.service";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit, OnDestroy {

  //TODO: Unsubscribe after inc song val.

  @Input() song: Song;
  @Input() index: number;
  @Input() horizontal: boolean;
  private is_admin: boolean;
  private is_authed: boolean;
  private session_status_subscription: Subscription;

  constructor(private _playerService: PlayerService, private _songService: SongService, private _userService: UserService, private _sessionService: SessionService, private _layoutService: LayoutService, private _router: Router) {
    this.session_status_subscription = this._sessionService.getUserSession().subscribe(
      res => {
        this.is_authed = res.authed;
        this.is_admin = res.admin;
      }
    )
  }

  ngOnInit() {
  }

  buildNotification(message: string, type: string) {
    this._layoutService.buildNotification(message, type);
  }

  setCurrentSong() {
    this._playerService.setCurrentSong(this.index, false);
    this.incSongRank(1)
  }

  addToUserPlaylist() {
    this._playerService.addToUserPlaylist(this.song);
  }

  addToFavorites() {
    console.log(this.is_authed);
    if (this.is_authed) {
      this._userService.addToFavorite(this.song).subscribe(
        res => this.buildNotification("Added to favorites", "default"),
        err => console.log(err)
      );
    } else {
      this._router.navigate(['/user/registration'])
    }
  }

  incSongRank(val: number) {
    this._songService.incSongRank(this.song.id, val).subscribe(
      res => {
        console.log('Song rank increased')
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.session_status_subscription.unsubscribe();
  }

}
