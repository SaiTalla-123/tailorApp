import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtailorComponent } from './addtailor.component';
import { AlltailorService } from '../services/alltailor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AddUserService } from '../services/add-user.service';

describe('AddtailorComponent', () => {
  let component: AddtailorComponent;
  let fixture: ComponentFixture<AddtailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddtailorComponent],
      providers: [AlltailorService, AddUserService,
        { provide: ToastrService, useClass: ToastrService }
      ],
      imports: [HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
