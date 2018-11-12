import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';
import { LoanFeeService } from './loan-fee.service';

@Component({
  selector: 'jhi-loan-fee-delete-dialog',
  templateUrl: './loan-fee-delete-dialog.component.html'
})
export class LoanFeeDeleteDialogComponent {
  loanFee: ILoanFee;

  constructor(private loanFeeService: LoanFeeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.loanFeeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'loanFeeListModification',
        content: 'Deleted an loanFee'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-loan-fee-delete-popup',
  template: ''
})
export class LoanFeeDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ loanFee }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LoanFeeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.loanFee = loanFee;
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
