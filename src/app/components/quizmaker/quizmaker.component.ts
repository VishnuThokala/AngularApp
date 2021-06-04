import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quizmaker',
  templateUrl: './quizmaker.component.html',
  styleUrls: ['./quizmaker.component.css']
})
export class QuizmakerComponent implements OnInit {
  question: string="";
  options: string = "";
  correctAnswer: string = "";
  topic: string = "";
  questionArr= new Array;
  optionsArr = new Array;
  questionOptions = new Array;
  correctAnswerArr = new Array;
  abc = ['A', 'B', 'C', 'D']
  result: string = "";
  validation = "";
  optval = "";
  constructor( private _authService:AuthService) { }

  ngOnInit(): void {
  }
  addQuestion() {
    if (this.question == "" || this.questionOptions == [] || this.correctAnswer == "") {
      this.validation = "please fill out all fields"
    } else {
      this.questionArr = [...this.questionArr, this.question];
      this.question = "";
      // let splittedOptions = this.options.split(',',4);
      this.optionsArr = [...this.optionsArr, this.questionOptions];
      this.questionOptions = [];
      this.correctAnswerArr = [...this.correctAnswerArr, this.correctAnswer]
      this.correctAnswer = ""
      console.log(this.questionArr, this.optionsArr, this.correctAnswerArr);
      this.optval = "";
      this.validation=""
    }
  }

  delete(i:number) {
    if (i > -1) {
      this.questionArr.splice(i, 1);
      this.correctAnswerArr.splice(i, 1);
      this.optionsArr.splice(i, 1);
    }
  }

  submitQuestions() {
    this._authService.submitQuizQuestions(this.questionArr, this.optionsArr, this.correctAnswerArr).subscribe(data => {
      console.log(data.msg);
      this.questionArr = [];
      this.optionsArr = [];
      this.correctAnswerArr = [];
      this.result="Quiz successfully stored"
    })
      ,
      (err:any) => {
        console.log(err)
      }
  }
  addOption() {
    if (this.options == "") {
      this.optval="option value cant be empty!"
    }
    else {
      this.questionOptions = [...this.questionOptions, this.options];
      this.options = "";
      if (this.questionOptions.length >4) {
        this.questionOptions.pop();
        this.optval = "cant have more than 4 options!"
      } else
        this.optval = "";
    }
  }

}
