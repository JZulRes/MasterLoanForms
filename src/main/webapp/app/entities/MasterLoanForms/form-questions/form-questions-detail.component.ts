import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

@Component({
  selector: 'jhi-form-questions-detail',
  templateUrl: './form-questions-detail.component.html'
})
export class FormQuestionsDetailComponent implements OnInit {
  formQuestions: IFormQuestions;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formQuestions }) => {
      this.formQuestions = formQuestions;
    });
  }

  previousState() {
    window.history.back();
  }
}
