import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILoan } from 'app/shared/model/MasterLoanForms/loan.model';
import { Principal } from 'app/core';
import { LoanService } from './loan.service';

@Component({
  selector: 'jhi-loan',
  templateUrl: './loan.component.html'
})
export class LoanComponent implements OnInit, OnDestroy {
  loans: ILoan[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    private loanService: LoanService,
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
      this.loanService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ILoan[]>) => (this.loans = res.body), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.loanService.query().subscribe(
      (res: HttpResponse<ILoan[]>) => {
        this.loans = res.body;
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
    this.registerChangeInLoans();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILoan) {
    return item.id;
  }

  registerChangeInLoans() {
    this.eventSubscriber = this.eventManager.subscribe('loanListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
