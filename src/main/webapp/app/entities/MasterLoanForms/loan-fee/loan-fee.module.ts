import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MasterLoanFormsSharedModule } from 'app/shared';
import {
  LoanFeeComponent,
  LoanFeeDetailComponent,
  LoanFeeUpdateComponent,
  LoanFeeDeletePopupComponent,
  LoanFeeDeleteDialogComponent,
  loanFeeRoute,
  loanFeePopupRoute
} from './';

const ENTITY_STATES = [...loanFeeRoute, ...loanFeePopupRoute];

@NgModule({
  imports: [MasterLoanFormsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LoanFeeComponent,
    LoanFeeDetailComponent,
    LoanFeeUpdateComponent,
    LoanFeeDeleteDialogComponent,
    LoanFeeDeletePopupComponent
  ],
  entryComponents: [LoanFeeComponent, LoanFeeUpdateComponent, LoanFeeDeleteDialogComponent, LoanFeeDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterLoanFormsLoanFeeModule {}
