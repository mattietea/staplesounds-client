import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {LayoutService} from "../../../services/layout.service";

@Component({
  selector: 'app-sidenav-toggle',
  templateUrl: './sidenav-toggle.component.html',
  styleUrls: ['./sidenav-toggle.component.css']
})
export class SidenavToggleComponent implements OnInit, OnDestroy {

  private sidenav_vis: boolean;
  private sidenav_vis_subscription: Subscription;

  constructor(private _layoutService: LayoutService) {}

  ngOnInit() {
    this.sidenav_vis_subscription = this._layoutService.getSidenavVis().subscribe(
      res => this.sidenav_vis = res
    )
  }

  toggleSidenavVis() {
    this._layoutService.updateSidenavVis();
  }

  ngOnDestroy() {
    this.sidenav_vis_subscription.unsubscribe();
  }

}
