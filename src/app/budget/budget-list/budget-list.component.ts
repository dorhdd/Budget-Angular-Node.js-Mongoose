import { Component, OnInit } from '@angular/core';
import { NewBudget } from 'src/app/models/new-budget';
import { BudgetListService } from './budget-list.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css'],
})
export class BudgetListComponent implements OnInit {
  budgetList: NewBudget[] = []
  budgetId: string;
  constructor(private budgetListService: BudgetListService) {}

  ngOnInit(): void {
    this.sub();
    this.onGetBudgets();
  }

  onOpenBudget(id: string) {
    const budgetId = { id: id };
    this.budgetListService.openBudget(budgetId);
  }

  sub() {
    this.budgetListService.budgetSub.subscribe((budgets) => {
      this.budgetList = budgets;
    });
  }

  onGetBudgets() {
    this.budgetListService.getBudgets();
  }

  onDeleteBudget(id: string) {
    this.budgetListService.deleteBudget(id);
  }
}
