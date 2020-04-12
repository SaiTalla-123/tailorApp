import { Component, OnInit } from '@angular/core';
import { AlltailorService } from '../services/alltailor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alltailor',
  templateUrl: './alltailor.component.html',
  styleUrls: ['./alltailor.component.scss']
})
export class AlltailorComponent implements OnInit {

  allTailors: any

  searchString: any
  filterargs = { shopName: '', maleDress: '' }

  constructor(private allTailorService: AlltailorService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.getAllTailors()
  }

  getAllTailors() {
    this.allTailorService.getAllTailors().subscribe(data => {
      this.allTailors = data;
    }, err => {
      this.toast.error('Error while retrieving Tailors.')
    })
  }

}
