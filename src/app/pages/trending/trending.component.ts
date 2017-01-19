import {Component, OnInit, OnDestroy} from '@angular/core';
import {Song} from "../../shared/models/song";
import {Subscription, Observable} from "rxjs";
import {SongService} from "../../shared/services/song.service";
import {Http} from "@angular/http";
import {QUERY_DESC} from "../../shared/utilities/requests";
import {PlayerService} from "../../shared/services/player.service";

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit, OnDestroy {

  private query = {
    "order": ["created DESC", "rank DESC"], "limit": 5
  };

  private buildQuery = {};


  private private
  trial = {
    "where": {
      "and": [
        {"created": {"gt": "2017-01-17"}},
        {"created": {"lt": "2017-01-16"}}
      ]
    },
    "order": "rank DESC"
  };

  private trial2 = {
    "where": {
      "and": [
        {"created": {"lte": "2017-01-17"}},
        {"rank": {"lt": "5"}}
      ]
    },
    "order": "rank DESC"
  };


  private songs: Array<Song>;
  private songs_subscription: Subscription;

  constructor(private _http: Http, private _songService: SongService, private _playerService: PlayerService) {


    this.songs_subscription = this._songService.getSongs(this.buildTrendingQuery(0, 7, 5)).subscribe(
      res => {
        this.songs = res;
        console.log(this.songs);
        this._playerService.setPagePlaylist(res);
      },
      err => console.log(Observable.throw(err))
    );

  }


  private buildTrendingQuery(start_day, end_day, size) {
    let start = new Date();
    let end = new Date();
    start.setDate(start.getDate() - start_day);
    end.setDate(end.getDate() - end_day);
    start.toISOString();
    end.toISOString();

    let query1 = {"where": {
      "and": [
        {"created": {"gt": end}},
        {"created": {"lt": start}}
      ]},
      "order": ["rank DESC"],
      "limit": size
    };

    return query1;
  }



  ngOnInit() {
  }

  ngOnDestroy() {
    this.songs_subscription.unsubscribe();
  }

}


