import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOutputComponent } from './error-output.component';

describe('ErrorOutputComponent', () => {
  let component: ErrorOutputComponent;
  let fixture: ComponentFixture<ErrorOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
