import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';
import { CustomerFormService } from './customer-form.service';
import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { FormQuestionService } from 'app/entities/MasterLoanForms/form-question';
import { ICustomer } from 'app/shared/model/MasterLoanForms/customer.model';
import { CustomerService } from 'app/entities/MasterLoanForms/customer';

@Component({
  selector: 'jhi-customer-form-update',
  templateUrl: './customer-form-update.component.html'
})
export class CustomerFormUpdateComponent implements OnInit {
  customerForm: ICustomerForm;
  isSaving: boolean;

  formquestions: IFormQuestion[];

  customers: ICustomer[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private customerFormService: CustomerFormService,
    private formQuestionService: FormQuestionService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ customerForm }) => {
      this.customerForm = customerForm;
    });
    this.formQuestionService.query({ filter: 'customerform-is-null' }).subscribe(
      (res: HttpResponse<IFormQuestion[]>) => {
        if (!this.customerForm.formQuestion || !this.customerForm.formQuestion.id) {
          this.formquestions = res.body;
        } else {
          this.formQuestionService.find(this.customerForm.formQuestion.id).subscribe(
            (subRes: HttpResponse<IFormQuestion>) => {
              this.formquestions = [subRes.body].concat(res.body);
            },
            (subRes: HttpErrorResponse) => this.onError(subRes.message)
          );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.customerService.query().subscribe(
      (res: HttpResponse<ICustomer[]>) => {
        this.customers = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.customerForm.id !== undefined) {
      this.subscribeToSaveResponse(this.customerFormService.update(this.customerForm));
    } else {
      this.subscribeToSaveResponse(this.customerFormService.create(this.customerForm));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerForm>>) {
    result.subscribe((res: HttpResponse<ICustomerForm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
