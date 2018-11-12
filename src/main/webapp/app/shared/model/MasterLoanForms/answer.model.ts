import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

export interface IAnswer {
  id?: number;
  textAnswer?: string;
  formQuestion?: IFormQuestion;
}

export class Answer implements IAnswer {
  constructor(public id?: number, public textAnswer?: string, public formQuestion?: IFormQuestion) {}
}
