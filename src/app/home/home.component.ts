import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../services/add-user.service';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  exportAs: 'addUserForm'
})
export class HomeComponent implements OnInit {

  addUserForm = this.formBuilder.group({
    firstName: ['', []],
    lastName: ['', []],
    email: ['', []],
    userName: ['', []],
    gender: ['', [Validators.required]],
    password: ['', []],
    userType: ['', [Validators.required]],
  })

  constructor(private addUserService: AddUserService, private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  addUserFromHomePage() {



  }
  register() {
    this.addUserService.register(this.addUserForm.value).subscribe(response => {
      if (response) {
        this.toastr.success('Registration success, Please Login..');
        this.addUserForm.reset();
      }
    }, err => {
      this.toastr.error('Registration Failed.')
    })
  }

  isUserLoggedIn() {
    return this.addUserService.getUserData();
  }

}
