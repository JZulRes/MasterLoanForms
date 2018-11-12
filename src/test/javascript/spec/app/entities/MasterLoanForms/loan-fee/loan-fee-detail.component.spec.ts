/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { LoanFeeDetailComponent } from 'app/entities/MasterLoanForms/loan-fee/loan-fee-detail.component';
import { LoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

describe('Component Tests', () => {
  describe('LoanFee Management Detail Component', () => {
    let comp: LoanFeeDetailComponent;
    let fixture: ComponentFixture<LoanFeeDetailComponent>;
    const route = ({ data: of({ loanFee: new LoanFee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [LoanFeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LoanFeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LoanFeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.loanFee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
