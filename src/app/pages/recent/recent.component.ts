import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http} from "@angular/http";
import {Observable, Observer, Subscription} from "rxjs";
import {QUERY_DESC} from "../../shared/utilities/requests";
import {SongService} from "../../shared/services/song.service";
import {PlayerService} from "../../shared/services/player.service";
import {Song} from "../../shared/models/song";

@Component({
    selector: 'app-recent',
    templateUrl: './recent.component.html',
    styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit, OnDestroy {

    private songs: Array<Song>;
    private songs_subscription: Subscription;

    constructor(private _http: Http, private _songService: SongService, private _playerService: PlayerService) {
        this.songs_subscription = this._songService.getSongs(QUERY_DESC).subscribe(
            res => {
                this.songs = res;
                this._playerService.setPagePlaylist(res);
            },
            err => console.log(Observable.throw(err))
        );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.songs_subscription.unsubscribe();
    }


}
