import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollupComponent } from './scrollup.component';

describe('ScrollupComponent', () => {
  let component: ScrollupComponent;
  let fixture: ComponentFixture<ScrollupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
