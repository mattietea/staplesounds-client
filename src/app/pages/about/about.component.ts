import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private admin = [
    {
      name: "Alec Benko",
      img: "benco.jpg",
      username: "benko",
      school: "Harvard",
      bio: "I don't actually go to Harvard."
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
      bio: "I just write shitty code."
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
