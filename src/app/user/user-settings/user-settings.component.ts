import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {SessionService} from "../../shared/authentication/session.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  private user:User;

  constructor(private _userService: UserService, private _sessionService: SessionService, private _router: Router) {
    this.user = this._sessionService.getCurrentUser();
  }

  ngOnInit() {
  }

  signOut() {
    this._sessionService.endUserSession();
    this._router.navigate(['/recent']);
  }
}
