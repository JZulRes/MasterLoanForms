/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { LoanFeeDeleteDialogComponent } from 'app/entities/MasterLoanForms/loan-fee/loan-fee-delete-dialog.component';
import { LoanFeeService } from 'app/entities/MasterLoanForms/loan-fee/loan-fee.service';

describe('Component Tests', () => {
  describe('LoanFee Management Delete Component', () => {
    let comp: LoanFeeDeleteDialogComponent;
    let fixture: ComponentFixture<LoanFeeDeleteDialogComponent>;
    let service: LoanFeeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [LoanFeeDeleteDialogComponent]
      })
        .overrideTemplate(LoanFeeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LoanFeeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoanFeeService);
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
