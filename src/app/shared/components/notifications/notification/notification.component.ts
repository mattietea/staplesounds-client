import {Component, OnInit, Input, style, state, animate, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})),
        animate(500, style({"margin-top": "-50px"}))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  @Input() notification;
  private is_active: boolean = true;

  constructor() {
    setTimeout(() => { this.is_active = false }, 2000);
  }

  ngOnInit() {

  }

  clearNotification() {

  }

}
