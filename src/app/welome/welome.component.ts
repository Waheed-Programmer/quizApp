import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welome',
  templateUrl: './welome.component.html',
  styleUrls: ['./welome.component.scss']
})
export class WelomeComponent implements OnInit {

  @ViewChild('name') getvalue!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  startQuiz(){
    localStorage.setItem("name",this.getvalue.nativeElement.value);
  }

}
