import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoan } from 'app/shared/model/MasterLoanForms/loan.model';

type EntityResponseType = HttpResponse<ILoan>;
type EntityArrayResponseType = HttpResponse<ILoan[]>;

@Injectable({ providedIn: 'root' })
export class LoanService {
  public resourceUrl = SERVER_API_URL + 'api/loans';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/loans';

  constructor(private http: HttpClient) {}

  create(loan: ILoan): Observable<EntityResponseType> {
    return this.http.post<ILoan>(this.resourceUrl, loan, { observe: 'response' });
  }

  update(loan: ILoan): Observable<EntityResponseType> {
    return this.http.put<ILoan>(this.resourceUrl, loan, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoan[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
