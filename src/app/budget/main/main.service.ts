import { Injectable, OnInit } from '@angular/core';
import { Expenditure } from 'src/app/models/expenditure';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ErrorsService } from 'src/app/errors.service';
import { Router } from '@angular/router';
import { NewBudget } from 'src/app/models/new-budget';

@Injectable({
  providedIn: 'root',
})
export class MainService implements OnInit {
  budgetList = [];
  URL = environment.HOST_URL + 'home';
  expenditureSub = new Subject<Expenditure[]>();

  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private route: Router
  ) {}

  ngOnInit() {}

  getExpenditure() {
    return this.http
      .get<Expenditure[]>(this.URL + '/get_expenditure')
      .subscribe((expenditure) => {
        if (expenditure['redirect']) {
          return this.route.navigate([expenditure['redirect']]);
        }
        this.expenditureSub.next(expenditure);
      });
  }

  saveExpenditure(expenditure: Expenditure) {
    return this.http
      .post<Expenditure[]>(this.URL + '/save_expenditure', expenditure)
      .subscribe((expenditures) => {
        if (expenditure['redirect']) {
          return this.route.navigate([expenditure['redirect']]);
        }
        if (expenditures[0]['msg']) {
          return this.errorService.errors.next(expenditures);
        }
        this.expenditureSub.next(expenditures);
      });
  }

  getBudget() {
    return this.http.get<NewBudget>(this.URL + '/get_budget');
  }

  deleteExpenditure(id: any) {
    return this.http
      .delete<Expenditure[]>(this.URL + `/delete_expenditure/${id}`)
      .subscribe((expenditures) => {
        if (expenditures['redirect']) {
          return this.route.navigate([expenditures['redirect']]);
        }
        this.expenditureSub.next(expenditures);
      });
  }
}
