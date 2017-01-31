import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.css']
})
export class UserSignInComponent implements OnInit {

  private user:User = new User;

  constructor() { }

  ngOnInit() {
  }

}
