import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILoan } from 'app/shared/model/MasterLoanForms/loan.model';
import { LoanService } from './loan.service';
import { ICustomer } from 'app/shared/model/MasterLoanForms/customer.model';
import { CustomerService } from 'app/entities/MasterLoanForms/customer';

@Component({
  selector: 'jhi-loan-update',
  templateUrl: './loan-update.component.html'
})
export class LoanUpdateComponent implements OnInit {
  loan: ILoan;
  isSaving: boolean;

  customers: ICustomer[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private loanService: LoanService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ loan }) => {
      this.loan = loan;
    });
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
    if (this.loan.id !== undefined) {
      this.subscribeToSaveResponse(this.loanService.update(this.loan));
    } else {
      this.subscribeToSaveResponse(this.loanService.create(this.loan));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ILoan>>) {
    result.subscribe((res: HttpResponse<ILoan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
