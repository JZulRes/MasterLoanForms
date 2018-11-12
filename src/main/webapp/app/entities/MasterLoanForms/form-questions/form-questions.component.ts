import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';
import { Principal } from 'app/core';
import { FormQuestionsService } from './form-questions.service';

@Component({
  selector: 'jhi-form-questions',
  templateUrl: './form-questions.component.html'
})
export class FormQuestionsComponent implements OnInit, OnDestroy {
  formQuestions: IFormQuestions[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    private formQuestionsService: FormQuestionsService,
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
      this.formQuestionsService
        .search({
          query: this.currentSearch
        })
        .subscribe(
          (res: HttpResponse<IFormQuestions[]>) => (this.formQuestions = res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.formQuestionsService.query().subscribe(
      (res: HttpResponse<IFormQuestions[]>) => {
        this.formQuestions = res.body;
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
    this.registerChangeInFormQuestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFormQuestions) {
    return item.id;
  }

  registerChangeInFormQuestions() {
    this.eventSubscriber = this.eventManager.subscribe('formQuestionsListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
