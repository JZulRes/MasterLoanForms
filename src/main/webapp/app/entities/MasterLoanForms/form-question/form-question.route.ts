import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { FormQuestionService } from './form-question.service';
import { FormQuestionComponent } from './form-question.component';
import { FormQuestionDetailComponent } from './form-question-detail.component';
import { FormQuestionUpdateComponent } from './form-question-update.component';
import { FormQuestionDeletePopupComponent } from './form-question-delete-dialog.component';
import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

@Injectable({ providedIn: 'root' })
export class FormQuestionResolve implements Resolve<IFormQuestion> {
  constructor(private service: FormQuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormQuestion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FormQuestion>) => response.ok),
        map((formQuestion: HttpResponse<FormQuestion>) => formQuestion.body)
      );
    }
    return of(new FormQuestion());
  }
}

export const formQuestionRoute: Routes = [
  {
    path: 'form-question',
    component: FormQuestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'form-question/:id/view',
    component: FormQuestionDetailComponent,
    resolve: {
      formQuestion: FormQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'form-question/new',
    component: FormQuestionUpdateComponent,
    resolve: {
      formQuestion: FormQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'form-question/:id/edit',
    component: FormQuestionUpdateComponent,
    resolve: {
      formQuestion: FormQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formQuestionPopupRoute: Routes = [
  {
    path: 'form-question/:id/delete',
    component: FormQuestionDeletePopupComponent,
    resolve: {
      formQuestion: FormQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
