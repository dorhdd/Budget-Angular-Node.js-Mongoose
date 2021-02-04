import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewBudget } from 'src/app/models/new-budget';
import { environment } from 'src/environments/environment';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent implements OnInit {
  URL = environment.HOST_URL + 'home';
  expenditures;
  budget;
  table: {} = {
    recommendedExpense: { d: 0, p: '' },
    highExpenses: [],
    soFar: { d: 0, p: '' },
    left: { d: 0, p: '' },
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getActivateBudget();
  }

  getActivateBudget() {
    return this.http
      .get<NewBudget>(this.URL + '/get_budget')
      .subscribe((budget) => {
        this.budget = budget;
        this.getExpenditures();
      });
  }

  getExpenditures() {
    return this.http.get(this.URL + '/get_expenditure').subscribe((ex) => {
      this.expenditures = ex;
      this.rme();
      this.soFar();
    });
  }

  rme() {
    const dateTo = new Date(this.budget.endDate);
    const dateFrom = new Date();
    const range =
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear());
    const rmeD = this.budget.initailAmount / range;
    const rmeP = (rmeD / this.budget.initailAmount) * 100;

    this.table['recommendedExpense']['d'] = rmeD;
    this.table['recommendedExpense']['p'] = rmeP;
    this.highEX(rmeD);
  }

  highEX(rme) {
    for (let ex of this.expenditures) {
      if (ex.amount > rme) {
        this.table['highExpenses'].push({
          d: ex.amount,
          p: (ex.amount / this.budget.initailAmount) * 100,
        });
      }
    }
  }

  soFar() {
    let sum = 0;
    for (let ex of this.expenditures) {
      sum = eval(`${sum}${ex.financialType}${ex.amount}`);
    }
    this.table['soFar']['d'] = sum;
    this.table['soFar']['p'] = (sum / this.budget['initailAmount']) * 100;

    const left = this.budget['initailAmount'] - sum;
    this.table['left']['d'] = left;
    this.table['left']['p'] = (left / this.budget['initailAmount']) * 100;
  }
}
