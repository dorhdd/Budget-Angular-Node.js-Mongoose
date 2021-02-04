import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewBudget } from 'src/app/models/new-budget';

@Injectable({
  providedIn: 'root',
})
export class NewBudgetService {
  URL = environment.HOST_URL + 'home';

  constructor(private http: HttpClient) {}

  addBudget(newBudget) {
    return this.http
      .post<NewBudget>(this.URL + '/post_budget', newBudget)
      .subscribe();
  }
  editBudget(newBudget) {
    return this.http
      .put<NewBudget>(this.URL + '/edit_budget', newBudget)
      .subscribe();
  }
}
