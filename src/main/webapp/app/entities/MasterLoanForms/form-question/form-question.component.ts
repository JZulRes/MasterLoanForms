import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { Principal } from 'app/core';
import { FormQuestionService } from './form-question.service';

@Component({
  selector: 'jhi-form-question',
  templateUrl: './form-question.component.html'
})
export class FormQuestionComponent implements OnInit, OnDestroy {
  formQuestions: IFormQuestion[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    private formQuestionService: FormQuestionService,
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
      this.formQuestionService
        .search({
          query: this.currentSearch
        })
        .subscribe(
          (res: HttpResponse<IFormQuestion[]>) => (this.formQuestions = res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.formQuestionService.query().subscribe(
      (res: HttpResponse<IFormQuestion[]>) => {
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

  trackId(index: number, item: IFormQuestion) {
    return item.id;
  }

  registerChangeInFormQuestions() {
    this.eventSubscriber = this.eventManager.subscribe('formQuestionListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
