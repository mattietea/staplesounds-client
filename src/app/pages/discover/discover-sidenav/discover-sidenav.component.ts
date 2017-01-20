import { Component, OnInit } from '@angular/core';
import {GENRE_LIST} from "../../../shared/utilities/constants";
import {LayoutService} from "../../../shared/services/layout.service";
import {UtilityService} from "../../../shared/services/utility.service";

@Component({
  selector: 'app-discover-sidenav',
  templateUrl: './discover-sidenav.component.html',
  styleUrls: ['./discover-sidenav.component.css']
})
export class DiscoverSidenavComponent implements OnInit {

  private active_genre_list:Array<string>  = [];
  private genre_list:Array<string> = GENRE_LIST;

  constructor(private _layoutService: LayoutService, private _utilityService: UtilityService) {
    this._utilityService.buildGenreQuery(["hipHop", "pop"]);
  }

  ngOnInit() {}

  removeFromActiveList(index: number) {
    this.active_genre_list.splice(index, 1);
  }

  addToActiveList(index: number) {
    if (this.active_genre_list.length != 3) {
      let exists = false;
      for (let genre in this.active_genre_list) {
        if(this.genre_list[index] == this.active_genre_list[genre]) {
          exists = true;
        }
      }
      if (!exists) {
        this.active_genre_list.push(this.genre_list[index]);
      } else {
        this._layoutService.buildNotification("Can't have duplicates", "default");
      }

    } else {
      this._layoutService.buildNotification("Max filters set", "default");
    }
  }

}
