import {Component, OnInit, OnDestroy} from '@angular/core';
import {SongService} from "../../shared/services/song.service";
import {Observable} from "rxjs";
import {LayoutService} from "../../shared/services/layout.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private songs = [];
  private loading: boolean = false;

  constructor(private _songService: SongService, private _layoutService: LayoutService) {

  }

  ngOnInit() {
    document.getElementById("search-input").focus();
  }

  private updateSearchVis() {
    this._layoutService.updateSearchVis(false);
  }

  private searchSongs(text: string) {
    this.loading = true;

    let title_query = {
      where: {
        or: [{title: {like: text, options: "i"}},
            {artist: {like: text, options: "i"}}]
      }
    };

    if(text.length != 0) {
      this._songService.getSongs(title_query).subscribe(
        data => {
          this.songs = data;
          this.loading = false;
        },
        err => {
          console.log(Observable.throw(err));
        }
      );

    } else {
      this.songs = [];
      this.loading = false;
    }

  }

  ngOnDestroy() {

  }

}
