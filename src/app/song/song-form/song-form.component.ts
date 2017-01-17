import {Component, OnInit, Input} from '@angular/core';
import {Song} from "../../shared/models/song";
import {SoundCloudService} from "../../shared/services/soundcloud.service";
import {Router} from "@angular/router";
import {SongService} from "../../shared/services/song.service";

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {

  @Input() song;
  private is_new;
  private genreTotal;
  private error = false;

  constructor(private _soundCloudService: SoundCloudService, private _router: Router, private _songService: SongService) {
    if (!this.song) {
      this.song = new Song;
      this.is_new = true;
      this.genreTotal = 0;
    } else {
      this.is_new = false;
      this.genreTotal = 100;
    }
  }

  ngOnInit() {
  }

  resolveSong() {
    this.song = this._soundCloudService.resolveSong(this.song.url);
  }

  submitSong() {
    if (this.is_new) {
      this._songService.postSong(this.song).subscribe(
        data => this._router.navigate(['/recent']),
        err => this.error = err.json()
      );
    } else {
      this._songService.putSong(this.song).subscribe(
        data => {},
        err => this.error = err.json()
      );
    }

  }

  getGenreTotal(event?: any) {
    this.genreTotal = this.totalGenre();
  }

  totalGenre() {
    let total = 0;
    for (let value in this.song.genres) {
      if (this.song.genres[value]) {
        total += this.song.genres[value];
      }
    }
    return total
  }

}
