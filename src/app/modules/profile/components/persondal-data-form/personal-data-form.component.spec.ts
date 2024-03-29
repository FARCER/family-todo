import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataFormComponent } from './personal-data-form.component';

describe('ProfileFormComponent', () => {
  let component: PersonalDataFormComponent;
  let fixture: ComponentFixture<PersonalDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
