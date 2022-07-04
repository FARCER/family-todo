import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDataFormComponent } from './auth-data-form.component';

describe('AuthDataFormComponent', () => {
  let component: AuthDataFormComponent;
  let fixture: ComponentFixture<AuthDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
