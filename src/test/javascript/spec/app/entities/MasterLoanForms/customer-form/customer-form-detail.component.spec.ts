/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { CustomerFormDetailComponent } from 'app/entities/MasterLoanForms/customer-form/customer-form-detail.component';
import { CustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

describe('Component Tests', () => {
  describe('CustomerForm Management Detail Component', () => {
    let comp: CustomerFormDetailComponent;
    let fixture: ComponentFixture<CustomerFormDetailComponent>;
    const route = ({ data: of({ customerForm: new CustomerForm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [CustomerFormDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CustomerFormDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerFormDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerForm).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
