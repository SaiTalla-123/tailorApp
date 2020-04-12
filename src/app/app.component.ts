import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddUserService } from './services/add-user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlltailorService } from './services/alltailor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'wearedressmakers';
  isLoggedIn = false;
  userName: string;
  password: string;
  userInfo: any;
  isTailorShopExist = false;

  constructor(
    private addUuserService: AddUserService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  login() {
    const req = {userName: this.userName, password: this.password}
    this.addUuserService.login(req).subscribe((resp: any) => {
      if (resp && resp.length > 0) {
        this.userInfo = resp[0];
        this.addUuserService.setUserData(resp[0]);
        sessionStorage.setItem('isLoggedIn', 'true');
        this.toastr.success('Login Success.');
        this.isLoggedIn = true;
      } else {
        this.toastr.error('Invalid Username or password.')
      }
    })
  }

  logout() {
    this.addUuserService.setUserData(null);
    sessionStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.isTailorShopExist = false;
    this.toastr.success('Logout Success.');
    this.router.navigateByUrl('/home');
  }

}
