import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { FormQuestionService } from './form-question.service';

@Component({
  selector: 'jhi-form-question-delete-dialog',
  templateUrl: './form-question-delete-dialog.component.html'
})
export class FormQuestionDeleteDialogComponent {
  formQuestion: IFormQuestion;

  constructor(
    private formQuestionService: FormQuestionService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.formQuestionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'formQuestionListModification',
        content: 'Deleted an formQuestion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-form-question-delete-popup',
  template: ''
})
export class FormQuestionDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formQuestion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FormQuestionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.formQuestion = formQuestion;
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
