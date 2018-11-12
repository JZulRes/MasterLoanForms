import { IQuestion } from 'app/shared/model/MasterLoanForms/question.model';
import { IAnswers } from 'app/shared/model/MasterLoanForms/answers.model';

export interface IFormQuestions {
  id?: number;
  questions?: IQuestion[];
  answers?: IAnswers[];
}

export class FormQuestions implements IFormQuestions {
  constructor(public id?: number, public questions?: IQuestion[], public answers?: IAnswers[]) {}
}
