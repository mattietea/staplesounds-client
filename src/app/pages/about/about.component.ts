import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private admin = [
    {
      name: "Alec Benco",
      img: "benco.jpg",
      username: "benco",
      school: "Harvard",
      bio: "I watch Top Gear and work in New Jersey as a project engineer."
    },
    {
      name: "Harry Lewis",
      img: "harry.png",
      username: "hazza",
      school: "USF",
      bio: "I like robot noises and I will share them with u."
    },
    {
      name: "Matt Thomas",
      img: "matt.png",
      username: "mattietea",
      school: "UNC - Chapel Hill",
      bio: "I just write shitty code"
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
