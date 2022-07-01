import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToGroupComponent } from './invite-to-group.component';

describe('InviteToFamilyComponent', () => {
  let component: InviteToGroupComponent;
  let fixture: ComponentFixture<InviteToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
