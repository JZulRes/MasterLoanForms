/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { LoanFeeService } from 'app/entities/MasterLoanForms/loan-fee/loan-fee.service';
import { ILoanFee, LoanFee } from 'app/shared/model/MasterLoanForms/loan-fee.model';

describe('Service Tests', () => {
  describe('LoanFee Service', () => {
    let injector: TestBed;
    let service: LoanFeeService;
    let httpMock: HttpTestingController;
    let elemDefault: ILoanFee;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      injector = getTestBed();
      service = injector.get(LoanFeeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new LoanFee(0, 'AAAAAAA', currentDate, currentDate, 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            expirationDate: currentDate.format(DATE_TIME_FORMAT),
            payDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should create a LoanFee', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            expirationDate: currentDate.format(DATE_TIME_FORMAT),
            payDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            expirationDate: currentDate,
            payDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new LoanFee(null))
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should update a LoanFee', async () => {
        const returnedFromService = Object.assign(
          {
            paid: 'BBBBBB',
            expirationDate: currentDate.format(DATE_TIME_FORMAT),
            payDate: currentDate.format(DATE_TIME_FORMAT),
            feeValue: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expirationDate: currentDate,
            payDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should return a list of LoanFee', async () => {
        const returnedFromService = Object.assign(
          {
            paid: 'BBBBBB',
            expirationDate: currentDate.format(DATE_TIME_FORMAT),
            payDate: currentDate.format(DATE_TIME_FORMAT),
            feeValue: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            expirationDate: currentDate,
            payDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => expect(body).toContainEqual(expected));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify([returnedFromService]));
        httpMock.verify();
      });

      it('should delete a LoanFee', async () => {
        const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
