import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

@Component({
  selector: 'jhi-form-question-detail',
  templateUrl: './form-question-detail.component.html'
})
export class FormQuestionDetailComponent implements OnInit {
  formQuestion: IFormQuestion;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formQuestion }) => {
      this.formQuestion = formQuestion;
    });
  }

  previousState() {
    window.history.back();
  }
}
