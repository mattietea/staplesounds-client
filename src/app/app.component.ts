import {Component, OnDestroy} from '@angular/core';
import {LayoutService} from "./shared/services/layout.service";
import {Subscription} from "rxjs";
import {SessionService} from "./shared/authentication/session.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  private playlist_vis: boolean;
  private playlist_vis_subscription: Subscription;



  constructor(private  _layoutService: LayoutService) {
    this.playlist_vis_subscription = this._layoutService.getPlaylistVis().subscribe(
      res => this.playlist_vis = res
    );



  }

  ngOnDestroy() {
    this.playlist_vis_subscription.unsubscribe();
  }
}
