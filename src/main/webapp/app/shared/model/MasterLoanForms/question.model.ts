import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

export interface IQuestion {
  id?: number;
  textQuestion?: string;
  formQuestion?: IFormQuestion;
}

export class Question implements IQuestion {
  constructor(public id?: number, public textQuestion?: string, public formQuestion?: IFormQuestion) {}
}
