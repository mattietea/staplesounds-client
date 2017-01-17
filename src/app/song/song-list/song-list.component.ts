import {Component, OnInit, Input} from '@angular/core';
import {Song} from "../../shared/models/song";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  @Input() songs:Array<Song>;

  constructor() { }

  ngOnInit() {
  }

}
