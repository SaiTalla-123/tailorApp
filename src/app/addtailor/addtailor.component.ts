import { Component, OnInit } from '@angular/core';
import { AlltailorService } from '../services/alltailor.service';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddUserService } from '../services/add-user.service';

@Component({
  selector: 'app-addtailor',
  templateUrl: './addtailor.component.html',
  styleUrls: ['./addtailor.component.scss'],
  exportAs: 'addTailorForm'
})
export class AddtailorComponent implements OnInit {

  maleDresses: string;
  femaleDresses: string;
  multipleTags: string;
  pics: any;
  images = [];
  userData: any;
  isTailorShopExist: boolean;
  addTailorForm = this.formBuilder.group({
    userId: ['', [Validators.required]],
    tailorName: ['', [Validators.required]],
    shopName: ['', [Validators.required]],
    shopNumber: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dateOfRegistration: ['', [Validators.required]],
    street: ['', [Validators.required]],
    area: ['', []],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    email: ['', [Validators.required]],
    rating: ['', [Validators.required]],
    maleDress: [[], []],
    femaleDress: [[], []],
    tags: [[], []],
    tailorPics: [[], []],
    maleDresses: ['', []],
    femaleDresses: ['', []],
    multipleTags: ['', []],
    pics: ['', []],
  });

  constructor(
    private allTailorService: AlltailorService,
    private router: Router,
    private toastr: ToastrService,
    private addUserService: AddUserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.addUserService.getUserData()) {
      this.userData = this.addUserService.getUserData();
      this.isTailorShopExist = false;
      this.resetAddForm();
      this.checkShopExsist();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  addTailor() {
    this.addTailorForm.get('maleDress').patchValue(this.addTailorForm.get('maleDresses').value ?
      this.addTailorForm.get('maleDresses').value.split(',') : []);
    this.addTailorForm.get('femaleDress').patchValue(this.addTailorForm.get('femaleDresses').value ?
      this.addTailorForm.get('femaleDresses').value.split(',') : []);
    this.addTailorForm.get('tags').patchValue(this.addTailorForm.get('multipleTags').value ?
      this.addTailorForm.get('multipleTags').value.split(',') : []);
    this.addTailorForm.get('tailorPics').patchValue(this.images);

    const formReq = this.addTailorForm.value;
    delete formReq.maleDresses;
    delete formReq.femaleDresses;
    delete formReq.multipleTags;

    this.allTailorService.addTailor(formReq).subscribe(response => {
      this.toastr.success('Tailor added success');
      this.router.navigateByUrl('/tailors')
    }, err => {
      this.toastr.error('Failed to add Tailor details.')
    });
  }
  checkShopExsist() {
    if (this.userData.userType === 'tailor') {
      this.allTailorService.getOneTailorByUserId(this.userData.id).subscribe(data => {
        if (data[0]) {
          this.isTailorShopExist = true;
        }
      }, err => {
        this.toastr.error('Error getting Tailor details.');
        this.router.navigateByUrl('/home');
      });
    }
  }

  resetAddForm() {
    this.addTailorForm.get('userId').patchValue(this.userData.id);
    this.addTailorForm.get('dateOfRegistration').patchValue(new Date());
    this.addTailorForm.get('rating').patchValue(5);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

}