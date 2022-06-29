import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetAsideComponent } from './cabinet-aside.component';

describe('CabinetAsideComponent', () => {
  let component: CabinetAsideComponent;
  let fixture: ComponentFixture<CabinetAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
