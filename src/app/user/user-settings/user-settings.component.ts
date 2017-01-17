import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {SessionService} from "../../shared/authentication/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private _userService: UserService, private _sessionService: SessionService, private _router: Router) {}

  ngOnInit() {
  }

  signOut() {
    this._sessionService.endUserSession();
    this._router.navigate(['/recent']);
  }
}
