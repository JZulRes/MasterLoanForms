import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';
import { ICustomer } from 'app/shared/model/MasterLoanForms/customer.model';

export interface ICustomerForm {
  id?: number;
  score?: string;
  verified?: string;
  formQuestion?: IFormQuestion;
  customer?: ICustomer;
}

export class CustomerForm implements ICustomerForm {
  constructor(
    public id?: number,
    public score?: string,
    public verified?: string,
    public formQuestion?: IFormQuestion,
    public customer?: ICustomer
  ) {}
}
