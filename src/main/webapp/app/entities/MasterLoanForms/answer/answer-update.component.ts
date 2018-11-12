import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAnswer } from 'app/shared/model/MasterLoanForms/answer.model';
import { AnswerService } from './answer.service';
import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { FormQuestionService } from 'app/entities/MasterLoanForms/form-question';

@Component({
  selector: 'jhi-answer-update',
  templateUrl: './answer-update.component.html'
})
export class AnswerUpdateComponent implements OnInit {
  answer: IAnswer;
  isSaving: boolean;

  formquestions: IFormQuestion[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private answerService: AnswerService,
    private formQuestionService: FormQuestionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ answer }) => {
      this.answer = answer;
    });
    this.formQuestionService.query().subscribe(
      (res: HttpResponse<IFormQuestion[]>) => {
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
    if (this.answer.id !== undefined) {
      this.subscribeToSaveResponse(this.answerService.update(this.answer));
    } else {
      this.subscribeToSaveResponse(this.answerService.create(this.answer));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IAnswer>>) {
    result.subscribe((res: HttpResponse<IAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackFormQuestionById(index: number, item: IFormQuestion) {
    return item.id;
  }
}
