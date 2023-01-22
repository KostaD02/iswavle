import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCodeComponent } from './example-code.component';

describe('ExampleCodeComponent', () => {
  let component: ExampleCodeComponent;
  let fixture: ComponentFixture<ExampleCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
