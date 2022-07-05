import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { WelomeComponent } from './welome/welome.component';

const routes: Routes = [
  {path:"", redirectTo:"welcome",pathMatch:"full"},
  {path:"welcome",component:WelomeComponent},
  {path:"question",component:QuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
