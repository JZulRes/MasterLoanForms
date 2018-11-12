import { Moment } from 'moment';
import { ILoan } from 'app/shared/model/MasterLoanForms/loan.model';

export interface ILoanFee {
  id?: number;
  paid?: string;
  expirationDate?: Moment;
  payDate?: Moment;
  feeValue?: number;
  loan?: ILoan;
}

export class LoanFee implements ILoanFee {
  constructor(
    public id?: number,
    public paid?: string,
    public expirationDate?: Moment,
    public payDate?: Moment,
    public feeValue?: number,
    public loan?: ILoan
  ) {}
}
