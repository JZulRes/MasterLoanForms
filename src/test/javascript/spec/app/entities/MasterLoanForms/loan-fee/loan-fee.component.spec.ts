/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { LoanFeeComponent } from 'app/entities/MasterLoanForms/loan-fee/loan-fee.component';
import { LoanFeeService } from 'app/entities/MasterLoanForms/loan-fee/loan-fee.service';
import { LoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

describe('Component Tests', () => {
  describe('LoanFee Management Component', () => {
    let comp: LoanFeeComponent;
    let fixture: ComponentFixture<LoanFeeComponent>;
    let service: LoanFeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [LoanFeeComponent],
        providers: []
      })
        .overrideTemplate(LoanFeeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LoanFeeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoanFeeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LoanFee(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.loanFees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
