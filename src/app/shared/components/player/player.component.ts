import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {Song} from "../../models/song";
import {Subscription, Observable} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {CLIENT_ID_PARAM} from "../../utilities/constants";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit, OnDestroy {

  private audio: any = new Audio;
  private song: Song;
  private current_time: number = 0;
  private full_time: number = 0;
  private song_subscription: Subscription;
  private is_playable: boolean = false;
  private is_playing: boolean = false;
  private is_repeating: boolean = false;
  private is_updating_vol: boolean = false;

  constructor(private _playerService: PlayerService) {
    this.song_subscription = this._playerService.getCurrentSong().subscribe(
      res => this.setPlayer(res),
      err => console.log(Observable.throw(err))
    )
  }

  ngOnInit() {
  }

  private setPlayer(song: Song) {
    this.song = song;
    this.is_playable = false;
    this.audio.src = song.audio + `?${CLIENT_ID_PARAM}`;

    this.audio.addEventListener('canplaythrough', () => {
      this.is_playable = true;
      this.audio.play();
      this.full_time = this.audio.duration;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.current_time = this.audio.currentTime;
      this.is_playing = true;
    });

    this.audio.addEventListener('pause', () => {
      this.is_playing = false;
    });

    this.audio.addEventListener('play', () => {
      this.is_playing = true;
    });

    this.audio.addEventListener('ended', () => {
      this.is_playing = false;
      if (this.is_repeating) {
        this.setPlayer(this.song);
      } else {
        this.getNextSong();
      }
      this.audio.removeEventListener('ended');
    });
  }

  private togglePlay() {
    if (this.is_playing) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  private getNextSong() {
    this._playerService.getNextSong();
  }

  private getPreviousSong() {
    this._playerService.getPreviousSong();
  }

  private setCurrentTime(value: number) {
    this.audio.currentTime = value;
  }

  private setCurrentVol(value: number) {
    this.audio.volume = value;
  }

  private toggleVolControl(value?: boolean) {
    if (value) {
      this.is_updating_vol = value;
    } else {
      this.is_updating_vol = !this.is_updating_vol;
    }
  }

  private toggleRepeat() {
    this.is_repeating = !this.is_repeating;
  }

  @HostListener('document:keypress', ['$event'])
  private handleKeyEvent(event: KeyboardEvent) {
    if (event.keyCode == 32 && !isNullOrUndefined(this.song)) {
      event.preventDefault();
      this.togglePlay();
    }
  }

  ngOnDestroy() {
    this.song_subscription.unsubscribe();
  }

}
