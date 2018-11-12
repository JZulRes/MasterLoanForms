import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAnswers } from 'app/shared/model/MasterLoanForms/answers.model';
import { AnswersService } from './answers.service';
import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';
import { FormQuestionsService } from 'app/entities/MasterLoanForms/form-questions';

@Component({
  selector: 'jhi-answers-update',
  templateUrl: './answers-update.component.html'
})
export class AnswersUpdateComponent implements OnInit {
  answers: IAnswers;
  isSaving: boolean;

  formquestions: IFormQuestions[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private answersService: AnswersService,
    private formQuestionsService: FormQuestionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ answers }) => {
      this.answers = answers;
    });
    this.formQuestionsService.query().subscribe(
      (res: HttpResponse<IFormQuestions[]>) => {
        this.formquestions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.answers.id !== undefined) {
      this.subscribeToSaveResponse(this.answersService.update(this.answers));
    } else {
      this.subscribeToSaveResponse(this.answersService.create(this.answers));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IAnswers>>) {
    result.subscribe((res: HttpResponse<IAnswers>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackFormQuestionsById(index: number, item: IFormQuestions) {
    return item.id;
  }
}
