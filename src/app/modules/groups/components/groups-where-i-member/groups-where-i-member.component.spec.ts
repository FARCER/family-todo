import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsWhereIMemberComponent } from './groups-where-i-member.component';

describe('GroupsWhereIMemberComponent', () => {
  let component: GroupsWhereIMemberComponent;
  let fixture: ComponentFixture<GroupsWhereIMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsWhereIMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsWhereIMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
