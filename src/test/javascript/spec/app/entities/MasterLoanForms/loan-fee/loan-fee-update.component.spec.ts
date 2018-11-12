/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { LoanFeeUpdateComponent } from 'app/entities/MasterLoanForms/loan-fee/loan-fee-update.component';
import { LoanFeeService } from 'app/entities/MasterLoanForms/loan-fee/loan-fee.service';
import { LoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

describe('Component Tests', () => {
  describe('LoanFee Management Update Component', () => {
    let comp: LoanFeeUpdateComponent;
    let fixture: ComponentFixture<LoanFeeUpdateComponent>;
    let service: LoanFeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [LoanFeeUpdateComponent]
      })
        .overrideTemplate(LoanFeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LoanFeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoanFeeService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new LoanFee(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.loanFee = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );

      it(
        'Should call create service on save for new entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new LoanFee();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.loanFee = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );
    });
  });
});
