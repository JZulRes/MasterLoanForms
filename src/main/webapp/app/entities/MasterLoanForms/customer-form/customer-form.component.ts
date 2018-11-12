import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';
import { Principal } from 'app/core';
import { CustomerFormService } from './customer-form.service';

@Component({
  selector: 'jhi-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  customerForms: ICustomerForm[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    private customerFormService: CustomerFormService,
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
      this.customerFormService
        .search({
          query: this.currentSearch
        })
        .subscribe(
          (res: HttpResponse<ICustomerForm[]>) => (this.customerForms = res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.customerFormService.query().subscribe(
      (res: HttpResponse<ICustomerForm[]>) => {
        this.customerForms = res.body;
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
    this.registerChangeInCustomerForms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomerForm) {
    return item.id;
  }

  registerChangeInCustomerForms() {
    this.eventSubscriber = this.eventManager.subscribe('customerFormListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
