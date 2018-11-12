/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionUpdateComponent } from 'app/entities/MasterLoanForms/form-question/form-question-update.component';
import { FormQuestionService } from 'app/entities/MasterLoanForms/form-question/form-question.service';
import { FormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

describe('Component Tests', () => {
  describe('FormQuestion Management Update Component', () => {
    let comp: FormQuestionUpdateComponent;
    let fixture: ComponentFixture<FormQuestionUpdateComponent>;
    let service: FormQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionUpdateComponent]
      })
        .overrideTemplate(FormQuestionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormQuestionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormQuestionService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new FormQuestion(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.formQuestion = entity;
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
          const entity = new FormQuestion();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.formQuestion = entity;
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
