import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

export interface IAnswers {
  id?: number;
  textAnswer?: string;
  formQuestions?: IFormQuestions;
}

export class Answers implements IAnswers {
  constructor(public id?: number, public textAnswer?: string, public formQuestions?: IFormQuestions) {}
}
