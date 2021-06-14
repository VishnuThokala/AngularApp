import { AuthService } from 'src/app/services/auth.service';
import { MyQuestion } from './../models/myquestion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
 
  SERVER_URI = "http://localhost:8000/"
  myquestion: MyQuestion = new MyQuestion;
  myQuestionArr: MyQuestion[] = [];
  quiz: any;
  constructor(private http: HttpClient,
    private _authService: AuthService) { }

  getQuiz(): Observable<any> {
    var signup_uri = this.SERVER_URI + "user/quiz/get";
    var token = this._authService.getLocalToken();
    if (token != null)
      var tokenp = JSON.parse(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenp}`
    })
    var str = this._authService.getLocalUser() || '';
    var userdata = JSON.parse(str) || {};
    
    return this.http.get<any>(signup_uri, { headers: headers })
  }


  submitQuizQuestions(questionArr: Array<string>, optionsArr: Array<string>, correctAnswerArr: Array<string>, topic: string): Observable<any> {
    for (var i = 0; i < questionArr.length; i++) {
      this.myquestion = new MyQuestion;

      this.myquestion.question = questionArr[i];
      var options = [{ 'option': '' }]
      var data = { 'option': '' };
      for (var j = 0; j < 4; j++) {      
        data = { 'option': optionsArr[i][j]};
        options.push(data);
      }
      this.myquestion.correctAnswer = correctAnswerArr[i];
      this.myquestion.options = options;
      this.myQuestionArr[i] = this.myquestion;
      console.log(this.myQuestionArr)
    }
    var signup_uri = this.SERVER_URI + "admin/quiz";
    var token = this._authService.getLocalToken();
    if (token != null)
      var tokenp = JSON.parse(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenp}`
    })
    var str = this._authService.getLocalUser() || '';
    var userdata = JSON.parse(str);
    if (userdata != null) {
      return this.http.post<MyQuestion>(signup_uri, { 'myQuestionArr': this.myQuestionArr,correctAnswerArr, topic, 'uid': userdata.uid }, { headers: headers })
    }
    return userdata;
  }

  setmyQuiz(data: any) {
    this.quiz = data;
    
  }
  getmyQuiz() {
    return this.quiz;
  }
  attemptQuiz(topic: any, quizmasterId: any): Observable<any> {
    console.log(quizmasterId,topic)
    var signup_uri = this.SERVER_URI + `user/quiz/get/${topic}/${quizmasterId}`;
    var token = this._authService.getLocalToken();
    if (token != null)
      var tokenp = JSON.parse(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenp}`
    })
    var str = this._authService.getLocalUser() || '';
    var userdata = JSON.parse(str) || {};
    var data = {};
    if (userdata != null) {
      return this.http.get<any>(signup_uri, { headers: headers })
    }
    else
      return userdata;
  }
}
