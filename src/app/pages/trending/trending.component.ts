import {Component, OnInit, OnDestroy} from '@angular/core';
import {Song} from "../../shared/models/song";
import {Subscription, Observable} from "rxjs";
import {SongService} from "../../shared/services/song.service";
import {Http} from "@angular/http";
import {QUERY_DESC} from "../../shared/utilities/requests";
import {PlayerService} from "../../shared/services/player.service";
import {UtilityService} from "../../shared/services/utility.service";

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit, OnDestroy {

  private songs: Array<Song>;
  private songs_subscription: Subscription;

  constructor(private _http: Http, private _songService: SongService, private _playerService: PlayerService, private _utilityService: UtilityService) {
    this.songs_subscription = this._songService.getSongs(this._utilityService.buildDateQuery(0, 7, 5)).subscribe(
      res => {
        this.songs = res;
        this._playerService.setPagePlaylist(res);
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


