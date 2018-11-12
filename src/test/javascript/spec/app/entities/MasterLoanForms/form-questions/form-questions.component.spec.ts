/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionsComponent } from 'app/entities/MasterLoanForms/form-questions/form-questions.component';
import { FormQuestionsService } from 'app/entities/MasterLoanForms/form-questions/form-questions.service';
import { FormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

describe('Component Tests', () => {
  describe('FormQuestions Management Component', () => {
    let comp: FormQuestionsComponent;
    let fixture: ComponentFixture<FormQuestionsComponent>;
    let service: FormQuestionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionsComponent],
        providers: []
      })
        .overrideTemplate(FormQuestionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormQuestionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormQuestionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormQuestions(123)],
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
