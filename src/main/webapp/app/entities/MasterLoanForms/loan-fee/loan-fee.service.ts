import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

type EntityResponseType = HttpResponse<ILoanFee>;
type EntityArrayResponseType = HttpResponse<ILoanFee[]>;

@Injectable({ providedIn: 'root' })
export class LoanFeeService {
  public resourceUrl = SERVER_API_URL + 'api/loan-fees';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/loan-fees';

  constructor(private http: HttpClient) {}

  create(loanFee: ILoanFee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(loanFee);
    return this.http
      .post<ILoanFee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(loanFee: ILoanFee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(loanFee);
    return this.http
      .put<ILoanFee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILoanFee>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILoanFee[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILoanFee[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(loanFee: ILoanFee): ILoanFee {
    const copy: ILoanFee = Object.assign({}, loanFee, {
      expirationDate: loanFee.expirationDate != null && loanFee.expirationDate.isValid() ? loanFee.expirationDate.toJSON() : null,
      payDate: loanFee.payDate != null && loanFee.payDate.isValid() ? loanFee.payDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expirationDate = res.body.expirationDate != null ? moment(res.body.expirationDate) : null;
      res.body.payDate = res.body.payDate != null ? moment(res.body.payDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((loanFee: ILoanFee) => {
        loanFee.expirationDate = loanFee.expirationDate != null ? moment(loanFee.expirationDate) : null;
        loanFee.payDate = loanFee.payDate != null ? moment(loanFee.payDate) : null;
      });
    }
    return res;
  }
}
