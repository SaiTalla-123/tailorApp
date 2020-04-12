import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltailorComponent } from './alltailor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../my-pipes/search-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';

describe('AlltailorComponent', () => {
  let component: AlltailorComponent;
  let fixture: ComponentFixture<AlltailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltailorComponent, SearchFilterPipe, HomeComponent ],
      imports:[FormsModule, HttpClientModule,
        ToastrModule.forRoot(),
        CarouselModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [{path: '/home', component: HomeComponent}, { path: '**', redirectTo: '/home' }, {path: 'tailor-detail', component: HomeComponent}]
        )
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
