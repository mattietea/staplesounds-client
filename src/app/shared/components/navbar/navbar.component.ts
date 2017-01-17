import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SessionService} from "../../authentication/session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  private is_authed: boolean;
  private is_admin: boolean;
  private session_status_subscription: Subscription;

  constructor(private _sessionService: SessionService) {
    this.session_status_subscription = this._sessionService.getUserSession().subscribe(
      res => {
        this.is_authed = res.authed;
        this.is_admin = res.admin;
      }
    )
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.session_status_subscription.unsubscribe();
  }

}
