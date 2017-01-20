import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http} from "@angular/http";
import {Observable, Observer, Subscription} from "rxjs";
import {QUERY_DESC} from "../../shared/utilities/requests";
import {SongService} from "../../shared/services/song.service";
import {PlayerService} from "../../shared/services/player.service";
import {Song} from "../../shared/models/song";
import {LayoutService} from "../../shared/services/layout.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit, OnDestroy {

  private songs: Array<Song>;
  private songs_subscription: Subscription;
  private sidenav_vis: boolean;
  private sidenav_vis_subscription: Subscription;

  constructor(private _http: Http, private _songService: SongService, private _playerService: PlayerService, private _layoutService: LayoutService) {
    this.songs_subscription = this._songService.getSongs(QUERY_DESC).subscribe(
      res => {
        this.songs = res;
        this._playerService.setPagePlaylist(res);
      },
      err => console.log(Observable.throw(err))
    );
    this.sidenav_vis_subscription = this._layoutService.getSidenavVis().subscribe(
      res => this.sidenav_vis = res
    );
    this._layoutService.updateSidenavVis(true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.songs_subscription.unsubscribe();
    this.sidenav_vis_subscription.unsubscribe();
  }




}
