import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFormQuestion } from 'app/shared/model/MasterLoanForms/form-question.model';

type EntityResponseType = HttpResponse<IFormQuestion>;
type EntityArrayResponseType = HttpResponse<IFormQuestion[]>;

@Injectable({ providedIn: 'root' })
export class FormQuestionService {
  public resourceUrl = SERVER_API_URL + 'api/form-questions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/form-questions';

  constructor(private http: HttpClient) {}

  create(formQuestion: IFormQuestion): Observable<EntityResponseType> {
    return this.http.post<IFormQuestion>(this.resourceUrl, formQuestion, { observe: 'response' });
  }

  update(formQuestion: IFormQuestion): Observable<EntityResponseType> {
    return this.http.put<IFormQuestion>(this.resourceUrl, formQuestion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormQuestion[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
