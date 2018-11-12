/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionComponent } from 'app/entities/MasterLoanForms/form-question/form-question.component';
import { FormQuestionService } from 'app/entities/MasterLoanForms/form-question/form-question.service';
import { FormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

describe('Component Tests', () => {
  describe('FormQuestion Management Component', () => {
    let comp: FormQuestionComponent;
    let fixture: ComponentFixture<FormQuestionComponent>;
    let service: FormQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionComponent],
        providers: []
      })
        .overrideTemplate(FormQuestionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormQuestionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormQuestionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormQuestion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
