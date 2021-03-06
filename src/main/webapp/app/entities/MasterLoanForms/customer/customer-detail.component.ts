import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomer } from 'app/shared/model/MasterLoanForms/customer.model';

@Component({
  selector: 'jhi-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {
  customer: ICustomer;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.customer = customer;
    });
  }

  previousState() {
    window.history.back();
  }
}
