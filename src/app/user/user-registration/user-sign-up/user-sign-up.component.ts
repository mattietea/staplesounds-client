import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  public user: User = new User;

  constructor() { }

  ngOnInit() {
  }

}
