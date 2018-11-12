import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';
import { Principal } from 'app/core';
import { LoanFeeService } from './loan-fee.service';

@Component({
  selector: 'jhi-loan-fee',
  templateUrl: './loan-fee.component.html'
})
export class LoanFeeComponent implements OnInit, OnDestroy {
  loanFees: ILoanFee[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    private loanFeeService: LoanFeeService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private activatedRoute: ActivatedRoute,
    private principal: Principal
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.loanFeeService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ILoanFee[]>) => (this.loanFees = res.body), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.loanFeeService.query().subscribe(
      (res: HttpResponse<ILoanFee[]>) => {
        this.loanFees = res.body;
        this.currentSearch = '';
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLoanFees();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILoanFee) {
    return item.id;
  }

  registerChangeInLoanFees() {
    this.eventSubscriber = this.eventManager.subscribe('loanFeeListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
