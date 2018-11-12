/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionsUpdateComponent } from 'app/entities/MasterLoanForms/form-questions/form-questions-update.component';
import { FormQuestionsService } from 'app/entities/MasterLoanForms/form-questions/form-questions.service';
import { FormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

describe('Component Tests', () => {
  describe('FormQuestions Management Update Component', () => {
    let comp: FormQuestionsUpdateComponent;
    let fixture: ComponentFixture<FormQuestionsUpdateComponent>;
    let service: FormQuestionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionsUpdateComponent]
      })
        .overrideTemplate(FormQuestionsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormQuestionsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormQuestionsService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new FormQuestions(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.formQuestions = entity;
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
          const entity = new FormQuestions();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.formQuestions = entity;
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
