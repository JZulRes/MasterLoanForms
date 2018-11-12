/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionDeleteDialogComponent } from 'app/entities/MasterLoanForms/form-question/form-question-delete-dialog.component';
import { FormQuestionService } from 'app/entities/MasterLoanForms/form-question/form-question.service';

describe('Component Tests', () => {
  describe('FormQuestion Management Delete Component', () => {
    let comp: FormQuestionDeleteDialogComponent;
    let fixture: ComponentFixture<FormQuestionDeleteDialogComponent>;
    let service: FormQuestionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionDeleteDialogComponent]
      })
        .overrideTemplate(FormQuestionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormQuestionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormQuestionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
