import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFormQuestions } from 'app/shared/model/MasterLoanForms/form-questions.model';

type EntityResponseType = HttpResponse<IFormQuestions>;
type EntityArrayResponseType = HttpResponse<IFormQuestions[]>;

@Injectable({ providedIn: 'root' })
export class FormQuestionsService {
  public resourceUrl = SERVER_API_URL + 'api/form-questions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/form-questions';

  constructor(private http: HttpClient) {}

  create(formQuestions: IFormQuestions): Observable<EntityResponseType> {
    return this.http.post<IFormQuestions>(this.resourceUrl, formQuestions, { observe: 'response' });
  }

  update(formQuestions: IFormQuestions): Observable<EntityResponseType> {
    return this.http.put<IFormQuestions>(this.resourceUrl, formQuestions, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormQuestions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormQuestions[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormQuestions[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
