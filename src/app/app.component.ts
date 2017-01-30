import {Component, OnDestroy, HostListener} from '@angular/core';
import {LayoutService} from "./shared/services/layout.service";
import {Subscription} from "rxjs";
import {SessionService} from "./shared/authentication/session.service";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  private playlist_vis: boolean;
  private playlist_vis_subscription: Subscription;
  private search_vis: boolean;
  private search_vis_subscription: Subscription;


  constructor(private  _layoutService: LayoutService) {
    this.playlist_vis_subscription = this._layoutService.getPlaylistVis().subscribe(
      res => this.playlist_vis = res
    );
    this.search_vis_subscription = this._layoutService.getSearchVis().subscribe(
      res => this.search_vis = res
    );
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  checkWindowSize(event?) {
    if (!isNullOrUndefined(event)) {
      if (event.target.innerWidth < 567) {
        this._layoutService.updateSidenavVis(false)
      } else {
        this._layoutService.updateSidenavVis(true)
      }
    } else {
      if (window.outerWidth < 567) {
        this._layoutService.updateSidenavVis(false)
      } else {
        this._layoutService.updateSidenavVis(true)
      }
    }
  }

  ngOnDestroy() {
    this.playlist_vis_subscription.unsubscribe();
    this.search_vis_subscription.unsubscribe();
  }


}
