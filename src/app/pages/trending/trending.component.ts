import {Component, OnInit, OnDestroy} from '@angular/core';
import {Song} from "../../shared/models/song";
import {Subscription, Observable} from "rxjs";
import {SongService} from "../../shared/services/song.service";
import {Http} from "@angular/http";
import {QUERY_DESC} from "../../shared/utilities/requests";
import {PlayerService} from "../../shared/services/player.service";
import {UtilityService} from "../../shared/services/utility.service";
import {LayoutService} from "../../shared/services/layout.service";

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit, OnDestroy {

  private songs: Array<Song>;
  private songs_subscription: Subscription;
  private sidenav_vis: boolean;
  private sidenav_vis_subscription: Subscription;

  constructor(private _http: Http, private _songService: SongService, private _playerService: PlayerService, private _utilityService: UtilityService, private _layoutService: LayoutService) {
    this.songs_subscription = this._songService.getSongs(this._utilityService.buildDateQuery(0, 7, 10)).subscribe(
      res => {
        this.songs = res;
        this._playerService.setPagePlaylist(res);
      },
      err => console.log(Observable.throw(err))
    );
    this.sidenav_vis_subscription = this._layoutService.getSidenavVis().subscribe(
      res => this.sidenav_vis = res
    );
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.sidenav_vis_subscription.unsubscribe();
    this.songs_subscription.unsubscribe();
  }

}


