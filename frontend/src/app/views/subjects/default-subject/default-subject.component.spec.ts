import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSubjectComponent } from './default-subject.component';

describe('DefaultSubjectComponent', () => {
  let component: DefaultSubjectComponent;
  let fixture: ComponentFixture<DefaultSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
