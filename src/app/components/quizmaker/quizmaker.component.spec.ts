import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizmakerComponent } from './quizmaker.component';

describe('QuizmakerComponent', () => {
  let component: QuizmakerComponent;
  let fixture: ComponentFixture<QuizmakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizmakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
