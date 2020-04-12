import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../services/add-user.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(private addUserService: AddUserService) { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.addUserService.getUserData();
  }

}
