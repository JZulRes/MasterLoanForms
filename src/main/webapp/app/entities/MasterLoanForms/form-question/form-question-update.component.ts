import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { FormQuestionService } from './form-question.service';
import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';
import { CustomerFormService } from 'app/entities/MasterLoanForms/customer-form';

@Component({
  selector: 'jhi-form-question-update',
  templateUrl: './form-question-update.component.html'
})
export class FormQuestionUpdateComponent implements OnInit {
  formQuestion: IFormQuestion;
  isSaving: boolean;

  customerforms: ICustomerForm[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private formQuestionService: FormQuestionService,
    private customerFormService: CustomerFormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formQuestion }) => {
      this.formQuestion = formQuestion;
    });
    this.customerFormService.query().subscribe(
      (res: HttpResponse<ICustomerForm[]>) => {
        this.customerforms = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.formQuestion.id !== undefined) {
      this.subscribeToSaveResponse(this.formQuestionService.update(this.formQuestion));
    } else {
      this.subscribeToSaveResponse(this.formQuestionService.create(this.formQuestion));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IFormQuestion>>) {
    result.subscribe((res: HttpResponse<IFormQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCustomerFormById(index: number, item: ICustomerForm) {
    return item.id;
  }
}
