/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { CustomerFormUpdateComponent } from 'app/entities/MasterLoanForms/customer-form/customer-form-update.component';
import { CustomerFormService } from 'app/entities/MasterLoanForms/customer-form/customer-form.service';
import { CustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

describe('Component Tests', () => {
  describe('CustomerForm Management Update Component', () => {
    let comp: CustomerFormUpdateComponent;
    let fixture: ComponentFixture<CustomerFormUpdateComponent>;
    let service: CustomerFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [CustomerFormUpdateComponent]
      })
        .overrideTemplate(CustomerFormUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerFormUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerFormService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new CustomerForm(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.customerForm = entity;
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
          const entity = new CustomerForm();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.customerForm = entity;
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
