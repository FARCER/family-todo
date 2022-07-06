import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvitationComponent } from './my-invitation.component';

describe('MyInvitationComponent', () => {
  let component: MyInvitationComponent;
  let fixture: ComponentFixture<MyInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
