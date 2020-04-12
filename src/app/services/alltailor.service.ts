import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlltailorService {

  constructor(private http: HttpClient) { }

  URL_ADD = 'http://localhost:3000';

  getAllTailors(): Observable<any> {
    return this.http.get(this.URL_ADD + '/tailors');
  }

  getOneTailorByTailorId(id) {
    return this.http.get(this.URL_ADD + '/tailors?id=' + id);
  }
  getOneTailorByUserId(userId) {
    return this.http.get(this.URL_ADD + '/tailors?userId=' + userId);
  }

  getReviews(id) {
    return this.http.get(this.URL_ADD + '/reviews?tailorId=' + id);
  }

  addReview(review) {
    return this.http.post(this.URL_ADD + '/reviews', review);
  }

  sendMessage(messageReq) {
    return this.http.post(this.URL_ADD + '/messages', messageReq);
  }

  getMessages(id) {
    return this.http.get(this.URL_ADD + '/messages?tailorId=' + id);
  }

  addTailor(fv) {
    return this.http.post(this.URL_ADD + '/tailors', fv);
  }

}
