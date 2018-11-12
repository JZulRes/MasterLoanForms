import { IQuestion } from 'app/shared/model/MasterLoanForms/question.model';
import { IAnswer } from 'app/shared/model/MasterLoanForms/answer.model';
import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

export interface IFormQuestion {
  id?: number;
  questions?: IQuestion[];
  answers?: IAnswer[];
  customerForm?: ICustomerForm;
}

export class FormQuestion implements IFormQuestion {
  constructor(public id?: number, public questions?: IQuestion[], public answers?: IAnswer[], public customerForm?: ICustomerForm) {}
}
