import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';
import { CustomerFormService } from './customer-form.service';
import { CustomerFormComponent } from './customer-form.component';
import { CustomerFormDetailComponent } from './customer-form-detail.component';
import { CustomerFormUpdateComponent } from './customer-form-update.component';
import { CustomerFormDeletePopupComponent } from './customer-form-delete-dialog.component';
import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

@Injectable({ providedIn: 'root' })
export class CustomerFormResolve implements Resolve<ICustomerForm> {
  constructor(private service: CustomerFormService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerForm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomerForm>) => response.ok),
        map((customerForm: HttpResponse<CustomerForm>) => customerForm.body)
      );
    }
    return of(new CustomerForm());
  }
}

export const customerFormRoute: Routes = [
  {
    path: 'customer-form',
    component: CustomerFormComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerForms'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'customer-form/:id/view',
    component: CustomerFormDetailComponent,
    resolve: {
      customerForm: CustomerFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerForms'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'customer-form/new',
    component: CustomerFormUpdateComponent,
    resolve: {
      customerForm: CustomerFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerForms'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'customer-form/:id/edit',
    component: CustomerFormUpdateComponent,
    resolve: {
      customerForm: CustomerFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerForms'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const customerFormPopupRoute: Routes = [
  {
    path: 'customer-form/:id/delete',
    component: CustomerFormDeletePopupComponent,
    resolve: {
      customerForm: CustomerFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CustomerForms'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
