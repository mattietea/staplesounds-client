import {Component, OnInit, OnDestroy} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {LayoutService} from "../../services/layout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  private user_playlist;
  private playlist_vis:boolean;
  private playlist_vis_subscription:Subscription;

  constructor(private _playerService: PlayerService, private _layoutService: LayoutService) {
    this.user_playlist = this._playerService.getUserPlaylist();
    this.playlist_vis_subscription = this._layoutService.getPlaylistVis().subscribe(res => this.playlist_vis = res);
  }

  ngOnInit() {
  }

  setCurrentSong(id: number) {
    this._playerService.setCurrentSong(id, true)
  }

  removeFromUserPlaylist(id: number) {
    this._playerService.removeFromUserPlaylist(id);
  }

  ngOnDestroy() {
    this.playlist_vis_subscription.unsubscribe();
  }
}
