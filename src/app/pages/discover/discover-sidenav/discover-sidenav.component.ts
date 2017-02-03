import {Component, OnInit} from '@angular/core';
import {GENRE_LIST} from "../../../shared/utilities/constants";
import {LayoutService} from "../../../shared/services/layout.service";
import {SongService} from "../../../shared/services/song.service";
import {QUERY_DESC} from "../../../shared/utilities/requests";

@Component({
  selector: 'app-discover-sidenav',
  templateUrl: './discover-sidenav.component.html',
  styleUrls: ['./discover-sidenav.component.css']
})
export class DiscoverSidenavComponent implements OnInit {

  private genre_list = GENRE_LIST;

  private genre_query = [];



  constructor(private _layoutService: LayoutService, private _songService: SongService) {

  }

  ngOnInit() {
  }


  addToActiveList(val: string) {
    let exists = false;
    this.genre_query.forEach((genre, i) => {
      if (genre == val) {
        this.genre_query.splice(i, 1);
        exists = true;
      }
    });
    if (!exists) {
      this.genre_query.push(val);
    }

    this._songService.setDiscoverSongs(this.genre_query);
  }

}
