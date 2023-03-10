import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeExampleComponent } from './create-code-example.component';

describe('CreateCodeExampleComponent', () => {
  let component: CreateCodeExampleComponent;
  let fixture: ComponentFixture<CreateCodeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCodeExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCodeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
