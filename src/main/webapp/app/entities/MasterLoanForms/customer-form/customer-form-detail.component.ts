import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

@Component({
  selector: 'jhi-customer-form-detail',
  templateUrl: './customer-form-detail.component.html'
})
export class CustomerFormDetailComponent implements OnInit {
  customerForm: ICustomerForm;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customerForm }) => {
      this.customerForm = customerForm;
    });
  }

  previousState() {
    window.history.back();
  }
}
