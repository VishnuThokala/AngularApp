import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  quizTopic: any = [];
  load = true;
  constructor(private _quizService: QuizService,
  private _router : Router) { }

  ngOnInit(): void {
    this._quizService.getQuiz().subscribe((info) => {
      info.forEach( (doc:any) => {
        console.log(doc.quizmaster,doc.topic)
        var data = {
          'quizmaster': doc.quizmaster,
          'topic': doc.topic,
          'quizmasterId':doc.quizmasterId,
        }
        this.quizTopic.push(data);
        
      })

      this.load = false;
    });
  }
  onAttempt(topic: any, quizmaster: any) {
    console.log(topic,quizmaster)
     this._quizService.attemptQuiz(topic, quizmaster).subscribe((res) => {
       console.log(res);
       this._quizService.setmyQuiz(res);
       this._router.navigateByUrl('/attemptQuiz')
    });
  }

}
