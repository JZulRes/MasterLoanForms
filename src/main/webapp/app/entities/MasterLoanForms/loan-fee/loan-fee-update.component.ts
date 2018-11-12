import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';
import { LoanFeeService } from './loan-fee.service';
import { ILoan } from 'app/shared/model/MasterLoanForms/loan.model';
import { LoanService } from 'app/entities/MasterLoanForms/loan';

@Component({
  selector: 'jhi-loan-fee-update',
  templateUrl: './loan-fee-update.component.html'
})
export class LoanFeeUpdateComponent implements OnInit {
  loanFee: ILoanFee;
  isSaving: boolean;

  loans: ILoan[];
  expirationDate: string;
  payDate: string;

  constructor(
    private jhiAlertService: JhiAlertService,
    private loanFeeService: LoanFeeService,
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ loanFee }) => {
      this.loanFee = loanFee;
      this.expirationDate = this.loanFee.expirationDate != null ? this.loanFee.expirationDate.format(DATE_TIME_FORMAT) : null;
      this.payDate = this.loanFee.payDate != null ? this.loanFee.payDate.format(DATE_TIME_FORMAT) : null;
    });
    this.loanService.query().subscribe(
      (res: HttpResponse<ILoan[]>) => {
        this.loans = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    this.loanFee.expirationDate = this.expirationDate != null ? moment(this.expirationDate, DATE_TIME_FORMAT) : null;
    this.loanFee.payDate = this.payDate != null ? moment(this.payDate, DATE_TIME_FORMAT) : null;
    if (this.loanFee.id !== undefined) {
      this.subscribeToSaveResponse(this.loanFeeService.update(this.loanFee));
    } else {
      this.subscribeToSaveResponse(this.loanFeeService.create(this.loanFee));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ILoanFee>>) {
    result.subscribe((res: HttpResponse<ILoanFee>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackLoanById(index: number, item: ILoan) {
    return item.id;
  }
}
