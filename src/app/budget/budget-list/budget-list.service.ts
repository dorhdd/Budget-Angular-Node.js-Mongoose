import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NewBudget } from 'src/app/models/new-budget';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BudgetListService {
  URL = environment.HOST_URL + 'home';
  budgetSub = new Subject<NewBudget[]>();

  constructor(private http: HttpClient, private route: Router) {}

  getBudgets() {
    return this.http
      .get<NewBudget[]>(this.URL + '/get_budgets')
      .subscribe((budgets) => {
        this.budgetSub.next(budgets);
      });
  }

  deleteBudget(id: string) {
    return this.http
      .delete<NewBudget[]>(this.URL + `/delete_budget/${id}`)
      .subscribe((budgets) => {
        this.budgetSub.next(budgets);
      });
  }

  openBudget(budgetId: { id: string }) {
    return this.http
      .post<string>(this.URL + '/openBudget', budgetId)
      .subscribe((location) => {
        this.route.navigate([location['redirect']]);
      });
  }
}
