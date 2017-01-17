import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  private current_tab:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  private toggleTab(value: boolean) {
    this.current_tab = value;
  }

}
