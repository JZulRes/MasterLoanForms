import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';
import { CustomerFormService } from './customer-form.service';

@Component({
  selector: 'jhi-customer-form-delete-dialog',
  templateUrl: './customer-form-delete-dialog.component.html'
})
export class CustomerFormDeleteDialogComponent {
  customerForm: ICustomerForm;

  constructor(
    private customerFormService: CustomerFormService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.customerFormService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'customerFormListModification',
        content: 'Deleted an customerForm'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-customer-form-delete-popup',
  template: ''
})
export class CustomerFormDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customerForm }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CustomerFormDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.customerForm = customerForm;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
