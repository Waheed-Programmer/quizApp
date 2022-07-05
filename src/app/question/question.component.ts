import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
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
  correctAnswer:number =0;
  IncorrectAnswer:number =0;
  Interval$:any;
  progress:string="0";
  isquizCompleted:boolean=false;
  constructor(private questionservice: QuestionService ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQustion();
    this.startCounter();
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

  answer(currentQno:number,option:any){
    if(currentQno===this.questionList.length){
      this.isquizCompleted = true;
      this.stopCounter();
    }
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      this.selectedQuestion=this.questionList[this.correctAnswer];
      this.currentQuestion++;
      this.selectedQuestion=this.questionList[this.currentQuestion];
      this.getProgresss();
    }
    else{

      this.points-=10;
      this.currentQuestion++;
      this.selectedQuestion=this.questionList[this.correctAnswer];
      this.IncorrectAnswer++;
      this.selectedQuestion=this.questionList[this.IncorrectAnswer];
      this.getProgresss();
    }
  }

  startCounter(){

    this.Interval$= interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.selectedQuestion=this.questionList[this.currentQuestion];
        this.counter=60;
        this.points-=10
      }
    });
    setTimeout(() => {
      this.Interval$.unsubcribe();
    }, 600000);
  }

  stopCounter(){
    this.Interval$.unsubcribe();
    this.counter=0;

  }

  resetCounter(){
    this.stopCounter;
    this.currentQuestion=0;
    // this.selectedQuestion=this.questionList[this.currentQuestion];
    this.points=0
    this.counter=60;
    this.startCounter();
    this.progress = "0";
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQustion();
    this.counter=60;
  }

  getProgresss(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }


}
