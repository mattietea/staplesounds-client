import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {SessionService} from "../../shared/authentication/session.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user:User;
  @Input() is_signing_in:boolean;
  @Input() is_editing:boolean = false;
  private error:any;

  constructor(private _userService: UserService, private _sessionService: SessionService,private _router: Router) { }

  ngOnInit() {}

  private register() {
    if (this.is_signing_in && !this.is_editing) {
      this._userService.signIn(this.user).subscribe(
        res => {
          this._sessionService.startUserSession(res);
          this._router.navigate(['/recent']);
        },
        err => this.error = err.json()
      );
    } else if(!this.is_signing_in && !this.is_editing) {
      this._userService.signUp(this.user).subscribe(
        res => console.log("success"),
        err => this.error = err.json()
      );
    } else if (this.is_editing) {
      this._userService.updateUser(this.user).subscribe(
        res => {
          let currentUser = JSON.parse(localStorage.getItem('current_user'));
          currentUser.user = this.user;
          localStorage.setItem('current_user', JSON.stringify(currentUser));
        },
        err => this.error = err.json()
      );
    }
  }

}
