import {Component, OnInit, OnDestroy} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  private sidenav_vis: boolean;
  private sidenav_vis_subscription: Subscription;

  constructor(private _layoutService: LayoutService) {
    this.sidenav_vis_subscription = this._layoutService.getSidenavVis().subscribe(
      res => this.sidenav_vis = res
    );
  }

  ngOnInit() {
  }

  public updateSidenavVis(value?) {
    this._layoutService.updateSidenavVis(this.sidenav_vis);
  }

  ngOnDestroy() {
    this.sidenav_vis_subscription.unsubscribe();
  }

}
