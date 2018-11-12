/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionsDetailComponent } from 'app/entities/MasterLoanForms/form-questions/form-questions-detail.component';
import { FormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

describe('Component Tests', () => {
  describe('FormQuestions Management Detail Component', () => {
    let comp: FormQuestionsDetailComponent;
    let fixture: ComponentFixture<FormQuestionsDetailComponent>;
    const route = ({ data: of({ formQuestions: new FormQuestions(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormQuestionsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormQuestionsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formQuestions).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
