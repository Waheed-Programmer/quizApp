import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name:string = "";
  public questionList:any = [];
  public currentQuestion:number = 0;
  constructor(private questionservice: QuestionService ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQustion();
  }
  getAllQustion(){
    this.questionservice.getQuestionJson()
    .subscribe(res=>{
     this.questionList = res.question
    })
  }

}
