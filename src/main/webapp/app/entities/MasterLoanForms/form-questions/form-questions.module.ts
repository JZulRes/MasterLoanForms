import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MasterLoanFormsSharedModule } from 'app/shared';
import {
  FormQuestionsComponent,
  FormQuestionsDetailComponent,
  FormQuestionsUpdateComponent,
  FormQuestionsDeletePopupComponent,
  FormQuestionsDeleteDialogComponent,
  formQuestionsRoute,
  formQuestionsPopupRoute
} from './';

const ENTITY_STATES = [...formQuestionsRoute, ...formQuestionsPopupRoute];

@NgModule({
  imports: [MasterLoanFormsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FormQuestionsComponent,
    FormQuestionsDetailComponent,
    FormQuestionsUpdateComponent,
    FormQuestionsDeleteDialogComponent,
    FormQuestionsDeletePopupComponent
  ],
  entryComponents: [
    FormQuestionsComponent,
    FormQuestionsUpdateComponent,
    FormQuestionsDeleteDialogComponent,
    FormQuestionsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterLoanFormsFormQuestionsModule {}
