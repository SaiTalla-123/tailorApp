import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlltailorService } from '../services/alltailor.service';
import { AddUserService } from '../services/add-user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tailordetail',
  templateUrl: './tailordetail.component.html',
  styleUrls: ['./tailordetail.component.scss']
})
export class TailordetailComponent implements OnInit {

  public clickedTailorid

  oneTailor: any
  tags: any
  pics: any
  userData: any;
  showReview = false;
  reviewMessage: string;
  ratingValue = 0;
  reviews: any[];
  messages: any[];
  tailorId: number;

  constructor(private router: Router, private route: ActivatedRoute, private tailorService: AlltailorService,
    private addUserService: AddUserService, private toastr: ToastrService, private matDialog: MatDialog) { }

  ngOnInit() {
    if (this.addUserService.getUserData()) {
      this.userData = this.addUserService.getUserData();
      this.route.params.subscribe(params => {
        if (params.id) {
          this.tailorId = params.id;
          this.getOneTailorByTailor(params.id);
          this.getReviews(params.id);
        } else {
          this.getOneTailorByUser(this.userData.id);
        }
      });
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  getOneTailorByTailor(id) {
    this.tailorService.getOneTailorByTailorId(id).subscribe(data => {
      this.oneTailor = data[0];
    }, err => {
      this.toastr.error('Error getting Tailor details.');
      this.router.navigateByUrl('/home');
    });
  }
  getOneTailorByUser(userId) {
    this.tailorService.getOneTailorByUserId(userId).subscribe(data => {
      this.oneTailor = data[0];
      this.getReviews(this.oneTailor.id);
      this.getMessages(this.oneTailor.id);
    }, err => {
      this.toastr.error('Error getting Tailor details.');
      this.router.navigateByUrl('/home');
    });
  }

  getReviews(id) {
    this.tailorService.getReviews(id).subscribe((reviews: any[]) => {
      this.reviews = reviews;
    }, err => {
      this.toastr.error('Error getting Reviews.');
    });
  }

  getMessages(id) {
    this.tailorService.getMessages(id).subscribe((messages: any[]) => {
      this.messages = messages;
    }, err => {
      this.toastr.error('Error getting Messages.');
    });
  }

  submitReview() {
    const req = {
      tailorId: this.tailorId,
      text: this.reviewMessage,
      rating: this.ratingValue,
      createdDate: new Date(),
      createdBy: this.userData.id,
      createdByName: this.userData.userName
    };
    this.tailorService.addReview(req).subscribe(resp => {
      this.toastr.success('Review added successfully.');
      this.reviews.push(resp);
      this.showReview = false;
      this.reviewMessage = '';
      this.ratingValue = 0;
    }, err => {
      this.toastr.error('Failed to Review.');
    });
  }

  openSendMsg() {
    const dialogRef = this.matDialog.open(MessageModalComponent);
    dialogRef.afterClosed().subscribe(messageInput => {
      console.log('The dialog was closed');
      if (messageInput) {
        const messageReq = {
          tailorId: this.oneTailor.id,
          creattionDate: new Date(),
          createdBy: this.userData.id,
          createdByName: this.userData.userName,
          message: messageInput
        }
        this.tailorService.sendMessage(messageReq).subscribe(resp => {
          if (resp) {
            this.toastr.success('Message Sent Successfully.');
          }
        }, err => {
          this.toastr.error('Failed to send Message.');
        });
      }
    });
  }

}

@Component({
  selector: 'app-message-modal',
  templateUrl: 'new-message-modal.component.html',
})
export class MessageModalComponent {
  message: string;
  constructor(
    public dialogConfirmationRef: MatDialogRef<MessageModalComponent>,
    private router: Router,
  ) { }

  onNoClick(): void {
    this.dialogConfirmationRef.close();
  }
}

