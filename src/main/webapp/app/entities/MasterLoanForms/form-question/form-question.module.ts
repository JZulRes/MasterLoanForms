import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MasterLoanFormsSharedModule } from 'app/shared';
import {
  FormQuestionComponent,
  FormQuestionDetailComponent,
  FormQuestionUpdateComponent,
  FormQuestionDeletePopupComponent,
  FormQuestionDeleteDialogComponent,
  formQuestionRoute,
  formQuestionPopupRoute
} from './';

const ENTITY_STATES = [...formQuestionRoute, ...formQuestionPopupRoute];

@NgModule({
  imports: [MasterLoanFormsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FormQuestionComponent,
    FormQuestionDetailComponent,
    FormQuestionUpdateComponent,
    FormQuestionDeleteDialogComponent,
    FormQuestionDeletePopupComponent
  ],
  entryComponents: [
    FormQuestionComponent,
    FormQuestionUpdateComponent,
    FormQuestionDeleteDialogComponent,
    FormQuestionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterLoanFormsFormQuestionModule {}
