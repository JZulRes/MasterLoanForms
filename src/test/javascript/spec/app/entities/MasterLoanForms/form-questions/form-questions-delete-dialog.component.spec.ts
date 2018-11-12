/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionsDeleteDialogComponent } from 'app/entities/MasterLoanForms/form-questions/form-questions-delete-dialog.component';
import { FormQuestionsService } from 'app/entities/MasterLoanForms/form-questions/form-questions.service';

describe('Component Tests', () => {
  describe('FormQuestions Management Delete Component', () => {
    let comp: FormQuestionsDeleteDialogComponent;
    let fixture: ComponentFixture<FormQuestionsDeleteDialogComponent>;
    let service: FormQuestionsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionsDeleteDialogComponent]
      })
        .overrideTemplate(FormQuestionsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormQuestionsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormQuestionsService);
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
