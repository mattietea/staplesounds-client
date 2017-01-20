import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Subscription, Observable} from "rxjs";
import {Song} from "../../shared/models/song";
import {PlayerService} from "../../shared/services/player.service";

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit, OnDestroy {

  private songs: Array<Song>;
  private songs_subscription: Subscription;

  constructor(private _userService: UserService, private _playerService: PlayerService) {
    this.songs_subscription = this._userService.getFavorites().subscribe(
      res => {
        this.songs = res.reverse();
        this._playerService.setPagePlaylist(this.songs);
      },
      err => console.log(Observable.throw(err))
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.songs_subscription.unsubscribe();
  }

}
