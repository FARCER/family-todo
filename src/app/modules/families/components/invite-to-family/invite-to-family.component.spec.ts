import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToFamilyComponent } from './invite-to-family.component';

describe('InviteToFamilyComponent', () => {
  let component: InviteToFamilyComponent;
  let fixture: ComponentFixture<InviteToFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteToFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteToFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
