/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MasterLoanFormsTestModule } from '../../../../test.module';
import { FormQuestionDetailComponent } from 'app/entities/MasterLoanForms/form-question/form-question-detail.component';
import { FormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

describe('Component Tests', () => {
  describe('FormQuestion Management Detail Component', () => {
    let comp: FormQuestionDetailComponent;
    let fixture: ComponentFixture<FormQuestionDetailComponent>;
    const route = ({ data: of({ formQuestion: new FormQuestion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MasterLoanFormsTestModule],
        declarations: [FormQuestionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormQuestionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormQuestionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
