import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

@Component({
  selector: 'jhi-loan-fee-detail',
  templateUrl: './loan-fee-detail.component.html'
})
export class LoanFeeDetailComponent implements OnInit {
  loanFee: ILoanFee;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ loanFee }) => {
      this.loanFee = loanFee;
    });
  }

  previousState() {
    window.history.back();
  }
}
