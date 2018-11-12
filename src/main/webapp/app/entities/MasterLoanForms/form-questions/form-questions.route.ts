import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';
import { FormQuestionsService } from './form-questions.service';
import { FormQuestionsComponent } from './form-questions.component';
import { FormQuestionsDetailComponent } from './form-questions-detail.component';
import { FormQuestionsUpdateComponent } from './form-questions-update.component';
import { FormQuestionsDeletePopupComponent } from './form-questions-delete-dialog.component';
import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

@Injectable({ providedIn: 'root' })
export class FormQuestionsResolve implements Resolve<IFormQuestions> {
  constructor(private service: FormQuestionsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormQuestions> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FormQuestions>) => response.ok),
        map((formQuestions: HttpResponse<FormQuestions>) => formQuestions.body)
      );
    }
    return of(new FormQuestions());
  }
}

export const formQuestionsRoute: Routes = [
  {
    path: 'form-questions',
    component: FormQuestionsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'form-questions/:id/view',
    component: FormQuestionsDetailComponent,
    resolve: {
      formQuestions: FormQuestionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'form-questions/new',
    component: FormQuestionsUpdateComponent,
    resolve: {
      formQuestions: FormQuestionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'form-questions/:id/edit',
    component: FormQuestionsUpdateComponent,
    resolve: {
      formQuestions: FormQuestionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formQuestionsPopupRoute: Routes = [
  {
    path: 'form-questions/:id/delete',
    component: FormQuestionsDeletePopupComponent,
    resolve: {
      formQuestions: FormQuestionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormQuestions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
