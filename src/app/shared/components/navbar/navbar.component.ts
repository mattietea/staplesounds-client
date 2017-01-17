import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SessionService} from "../../authentication/session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  private session_status: boolean;
  private session_status_subscription: Subscription;
  private is_admin: boolean = false;

  constructor(private _sessionService: SessionService) {
    this.session_status_subscription = this._sessionService.checkUserSession().subscribe(
      res => {
        this.session_status = res;
        if (res) {
          this.is_admin = this._sessionService.getCurrentUser().user.admin;
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.session_status_subscription.unsubscribe();
  }


}
