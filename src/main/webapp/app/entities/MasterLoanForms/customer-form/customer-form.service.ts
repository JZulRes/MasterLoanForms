import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerForm } from 'app/shared/model/MasterLoanForms/customer-form.model';

type EntityResponseType = HttpResponse<ICustomerForm>;
type EntityArrayResponseType = HttpResponse<ICustomerForm[]>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  public resourceUrl = SERVER_API_URL + 'api/customer-forms';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/customer-forms';

  constructor(private http: HttpClient) {}

  create(customerForm: ICustomerForm): Observable<EntityResponseType> {
    return this.http.post<ICustomerForm>(this.resourceUrl, customerForm, { observe: 'response' });
  }

  update(customerForm: ICustomerForm): Observable<EntityResponseType> {
    return this.http.put<ICustomerForm>(this.resourceUrl, customerForm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerForm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerForm[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
