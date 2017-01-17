import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SongService} from "../../shared/services/song.service";
import {Song} from "../../shared/models/song";

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  private song:Song;

  constructor(private _route: ActivatedRoute, private _songService: SongService) {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._songService.getSong(id).subscribe(data => this.song = data);
    });
  }

  ngOnInit() {

  }

}
