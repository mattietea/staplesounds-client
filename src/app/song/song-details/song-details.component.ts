import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SongService} from "../../shared/services/song.service";
import {Song} from "../../shared/models/song";
import {Observable} from "rxjs";
import {PlayerService} from "../../shared/services/player.service";
import {SITE_DESC} from "../../shared/utilities/constants";
import {MetaService} from "ng2-meta";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  private song: Song;

  constructor(private _route: ActivatedRoute, private _songService: SongService, private _playerService: PlayerService) {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._songService.getSong(id).subscribe(
        res => {
          this.song = res;
          this._playerService.setPagePlaylist([this.song]);
        },
        err => console.log(Observable.throw(err))
      );
    });

  }

  ngOnInit() {
  }

}
