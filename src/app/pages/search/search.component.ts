import {Component, OnInit, OnDestroy} from '@angular/core';
import {SongService} from "../../shared/services/song.service";
import {PlayerService} from "../../shared/services/player.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(private _songService: SongService, private _playerService: PlayerService) {
  }

  ngOnInit() {}

  ngOnDestroy() {
  }

}
