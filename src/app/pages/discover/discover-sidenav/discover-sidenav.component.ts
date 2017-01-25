import {Component, OnInit} from '@angular/core';
import {GENRE_LIST} from "../../../shared/utilities/constants";
import {LayoutService} from "../../../shared/services/layout.service";
import {UtilityService} from "../../../shared/services/utility.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {SongService} from "../../../shared/services/song.service";

@Component({
  selector: 'app-discover-sidenav',
  templateUrl: './discover-sidenav.component.html',
  styleUrls: ['./discover-sidenav.component.css']
})
export class DiscoverSidenavComponent implements OnInit {

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

  private ref =
    {
      where: {
        and: []
      },
      order: "created DESC"
    };


  private active_genre_list: Array<string> = [];
  private genre_list: Array<string> = GENRE_LIST;

  constructor(private _layoutService: LayoutService, private _songService: SongService) {
  }

  ngOnInit() {
  }

  removeFromActiveList(index: number) {
    this.active_genre_list.splice(index, 1);
  }

  addToActiveList(val: string) {
    let queryRef = this.ref.where.and;
    let exists = false;

    queryRef.forEach((genre, i) => {
      if (genre == this.genre[val]) {
        queryRef.splice(i, 1);
        exists = true;
      }
    });
    if (!exists) {
      queryRef.push(this.genre[val]);
      this._songService.getSongs(this.genre).subscribe(
        res => console.log('Songs updated')
      )
    } else {

    }

  }

  private submit(value: any, event: Event) {
    console.log(JSON.stringify(value));
  }

}
