import { QuizService } from 'src/app/services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.css']
})
export class QuizAttemptComponent implements OnInit {

  constructor(
    private _quizService:QuizService
  ) { }
  quiz: any
  start: boolean
  correct: number = 0;
  wrong: number = 0;
  crt: boolean = false;
  yes: boolean = false;
  no: boolean = false;
  wrongopt: string;
  index: number;
  completed: boolean = false;
  optsubmitted: boolean =false;
  title = "";
  setter = "";
  quizLength = 0;
  questionCounter = 1;
  ngOnInit(): void {
    this.quiz = this._quizService.getmyQuiz();
    this.title = this.quiz[0].questionformat['topic'];
    this.setter = this.quiz[0].questionformat['quizmaster']
    this.quizLength = this.quiz.length;
  }
  startQuiz() {
    this.start = true;
  }
  next() {
    console.log(this.quizLength)
    this.optsubmitted = false;
    if (this.quizLength!=1) {
      this.quiz.splice(this.index, 1);
      this.yes = false;
      this.crt = false;
      this.no = false;
      this.quizLength = this.quizLength - 1;
    }
    
    else {
      this.completed = true;
      console.log("finished")
    }
  }
  checkAnswer(opt: string, i: any) {
    if (!this.optsubmitted) {
      this.optsubmitted = true;
      this.index = i;
      this.crt = true;
      if (this.quiz[i].questionformat['correctAnswer'] == opt) {
        this.correct += 1;
        this.yes = true;
        this.no = false
      }
      else {
        this.wrongopt = opt;
        this.no = true;
        this.yes = false
        this.wrong += 1;
      }
    }
  }
}
