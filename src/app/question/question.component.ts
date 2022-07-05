import { NonNullAssert } from '@angular/compiler';
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
  public points:number=0;
  public currentQuestion:number = 0;
  counter=60;
  selectedQuestion:any=null;
  constructor(private questionservice: QuestionService ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQustion();
  }
  getAllQustion(){
    this.questionservice.getQuestionJson()
    .subscribe(res=>{
     this.questionList = res.question
     this.selectedQuestion=this.questionList[this.currentQuestion];

    })
  }

  nextQuestion(){

    this.currentQuestion++;
    this.selectedQuestion=this.questionList[this.currentQuestion];
  }
  previousQuestion(){

    this.currentQuestion--;
    this.selectedQuestion=this.questionList[this.currentQuestion];
  }

}
