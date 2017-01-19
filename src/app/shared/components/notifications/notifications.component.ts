import {Component, OnInit, OnDestroy} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private notifications:Array<any> = [];
  private notification_subscription: Subscription;
  private playlist_vis: boolean = false;
  private playlist_vis_subscription: Subscription;

  constructor(private _layoutService: LayoutService) {
    this.notification_subscription = this._layoutService.getNotifications().subscribe(
      res => this.notifications.push(res)
    );
    this.playlist_vis_subscription = this._layoutService.getPlaylistVis().subscribe(
      res => this.playlist_vis = res
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.notification_subscription.unsubscribe();
    this.playlist_vis_subscription.unsubscribe();
  }

}
