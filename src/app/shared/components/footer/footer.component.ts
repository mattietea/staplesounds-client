import {Component, OnInit, OnDestroy} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  private playlist_vis: boolean;
  private playlist_vis_subscription: Subscription;

  constructor(private _layoutService: LayoutService) {
    this._layoutService.getPlaylistVis().subscribe(
      res => this.playlist_vis = res
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.playlist_vis_subscription.unsubscribe();
  }

}
