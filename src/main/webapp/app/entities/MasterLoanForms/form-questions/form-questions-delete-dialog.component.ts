import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';
import { FormQuestionsService } from './form-questions.service';

@Component({
  selector: 'jhi-form-questions-delete-dialog',
  templateUrl: './form-questions-delete-dialog.component.html'
})
export class FormQuestionsDeleteDialogComponent {
  formQuestions: IFormQuestions;

  constructor(
    private formQuestionsService: FormQuestionsService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.formQuestionsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'formQuestionsListModification',
        content: 'Deleted an formQuestions'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-form-questions-delete-popup',
  template: ''
})
export class FormQuestionsDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formQuestions }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FormQuestionsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.formQuestions = formQuestions;
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
