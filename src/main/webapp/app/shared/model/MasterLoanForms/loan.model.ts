import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';
import { ICustomer } from 'app/shared/model/MasterLoanForms/customer.model';

export interface ILoan {
  id?: number;
  loanValue?: number;
  paid?: string;
  loanFees?: ILoanFee[];
  customer?: ICustomer;
}

export class Loan implements ILoan {
  constructor(
    public id?: number,
    public loanValue?: number,
    public paid?: string,
    public loanFees?: ILoanFee[],
    public customer?: ICustomer
  ) {}
}
