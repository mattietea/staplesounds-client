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

  private genre = {
    hipHop: {'genres.hipHop': {exists: true}},
    dubstep: {'genres.dubstep': {exists: true}},
    house: {'genres.house': {exists: true}},
    future: {'genres.future': {exists: true}},
    techno: {'genres.techno': {exists: true}},
    bass: {'genres.bass': {exists: true}},
    pop: {'genres.pop': {exists: true}},
    rock: {'genres.rock': {exists: true}},
    indie: {'genres.indie': {exists: true}},
  };

  private query =
    {
      where: {
        and: []
      },
      order: "created DESC"
    };



  constructor(private _layoutService: LayoutService, private _songService: SongService) {
  }

  ngOnInit() {
  }


  addToActiveList(val: string) {
    let queryRef = this.query.where.and;
    let exists = false;
    queryRef.forEach((genre, i) => {
      if (genre == this.genre[val]) {
        queryRef.splice(i, 1);
        exists = true;
      }
    });
    if (!exists) {
      queryRef.push(this.genre[val]);
    }

    if (queryRef.length > 0) {
      this._songService.setDiscoverSongs(this.query)
    } else {
      this._songService.setDiscoverSongs(QUERY_DESC)
    }

  }

}
