import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';
import { LoanFeeService } from './loan-fee.service';
import { LoanFeeComponent } from './loan-fee.component';
import { LoanFeeDetailComponent } from './loan-fee-detail.component';
import { LoanFeeUpdateComponent } from './loan-fee-update.component';
import { LoanFeeDeletePopupComponent } from './loan-fee-delete-dialog.component';
import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

@Injectable({ providedIn: 'root' })
export class LoanFeeResolve implements Resolve<ILoanFee> {
  constructor(private service: LoanFeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoanFee> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LoanFee>) => response.ok),
        map((loanFee: HttpResponse<LoanFee>) => loanFee.body)
      );
    }
    return of(new LoanFee());
  }
}

export const loanFeeRoute: Routes = [
  {
    path: 'loan-fee',
    component: LoanFeeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LoanFees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'loan-fee/:id/view',
    component: LoanFeeDetailComponent,
    resolve: {
      loanFee: LoanFeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LoanFees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'loan-fee/new',
    component: LoanFeeUpdateComponent,
    resolve: {
      loanFee: LoanFeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LoanFees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'loan-fee/:id/edit',
    component: LoanFeeUpdateComponent,
    resolve: {
      loanFee: LoanFeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LoanFees'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const loanFeePopupRoute: Routes = [
  {
    path: 'loan-fee/:id/delete',
    component: LoanFeeDeletePopupComponent,
    resolve: {
      loanFee: LoanFeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LoanFees'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
