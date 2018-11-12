import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';
import { ILoan } from 'app/shared/model/MasterLoanForms/loan.model';

export interface ICustomer {
  id?: number;
  cedulaCustomer?: number;
  typeIdCustomer?: string;
  signatureWallet?: string;
  customerForms?: ICustomerForm[];
  loans?: ILoan[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public cedulaCustomer?: number,
    public typeIdCustomer?: string,
    public signatureWallet?: string,
    public customerForms?: ICustomerForm[],
    public loans?: ILoan[]
  ) {}
}
