import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';
import { FormQuestionsService } from './form-questions.service';

@Component({
  selector: 'jhi-form-questions-update',
  templateUrl: './form-questions-update.component.html'
})
export class FormQuestionsUpdateComponent implements OnInit {
  formQuestions: IFormQuestions;
  isSaving: boolean;

  constructor(private formQuestionsService: FormQuestionsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formQuestions }) => {
      this.formQuestions = formQuestions;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.formQuestions.id !== undefined) {
      this.subscribeToSaveResponse(this.formQuestionsService.update(this.formQuestions));
    } else {
      this.subscribeToSaveResponse(this.formQuestionsService.create(this.formQuestions));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IFormQuestions>>) {
    result.subscribe((res: HttpResponse<IFormQuestions>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
