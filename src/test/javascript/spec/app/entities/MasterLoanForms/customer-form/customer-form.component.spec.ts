/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { CustomerFormComponent } from 'app/entities/MasterLoanForms/customer-form/customer-form.component';
import { CustomerFormService } from 'app/entities/MasterLoanForms/customer-form/customer-form.service';
import { CustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

describe('Component Tests', () => {
  describe('CustomerForm Management Component', () => {
    let comp: CustomerFormComponent;
    let fixture: ComponentFixture<CustomerFormComponent>;
    let service: CustomerFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [CustomerFormComponent],
        providers: []
      })
        .overrideTemplate(CustomerFormComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerFormComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerFormService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerForm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerForms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
