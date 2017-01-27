import {Component, OnInit, Input, HostListener} from '@angular/core';
import {Song} from "../../shared/models/song";
import {SoundCloudService} from "../../shared/services/soundcloud.service";
import {Router} from "@angular/router";
import {SongService} from "../../shared/services/song.service";
import {isNullOrUndefined} from "util";
import {GENRE_LIST} from "../../shared/utilities/constants";

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {

  @Input() song: Song;
  @Input() is_new: boolean;
  private genreTotal;
  private error;
  private genre_list = GENRE_LIST;

  constructor(private _soundCloudService: SoundCloudService, private _router: Router, private _songService: SongService) {
    if (!this.is_new) {
      this.song = new Song;
      this.genreTotal = 0;
    } else {

    }
  }

  ngOnInit() {
    this.getGenreTotal();
  }

  resolveSong() {
    this.song = this._soundCloudService.resolveSong(this.song.url);
  }

  submitSong() {
    if (this.is_new) {
      this._songService.postSong(this.song).subscribe(
        data => this._router.navigate(['/discover']),
        err => this.error = err.json()
      );
    } else {
      this._songService.putSong(this.song).subscribe(
        data => this._router.navigate(['/songs/', this.song.id]),
        err => this.error = err.json()
      );
    }

  }

  @HostListener('document:keyup', ['$event'])
  getGenreTotal(event?: Event) {
    let total = 0;
    for (let key in this.song.genres) {
      if (this.song.genres[key] > 0 && this.song.genres[key] != null) {
        total += this.song.genres[key];
      } else {
        delete this.song.genres[key];
      }
    }
    this.genreTotal = total
  }

  totalGenre() {

  }

}
