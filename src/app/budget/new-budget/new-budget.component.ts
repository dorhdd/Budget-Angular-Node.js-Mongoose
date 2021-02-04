import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewBudget } from 'src/app/models/new-budget';
import { DatePipe } from '@angular/common';
import { NewBudgetService } from './new-budget.service';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css'],
})
export class NewBudgetComponent implements OnInit {
  inputs: { controlName: string; type: string; label: string }[] = [
    { controlName: 'budgetName', type: 'string', label: 'Budget Name' },
    { controlName: 'initailAmount', type: 'number', label: 'Initail Amount' },
    { controlName: 'endDate', type: 'date', label: 'End Date' },
    { controlName: 'monthlyIncome', type: 'number', label: 'Monthly Income' },
  ];
  constructor(private newBudgetService: NewBudgetService) {}

  newBudgetForm: FormGroup;

  ngOnInit(): void {
    this.budgetForm();
  }

  private budgetForm() {
    this.newBudgetForm = new FormGroup({
      budgetName: new FormControl('', [Validators.required]),
      initailAmount: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      monthlyIncome: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.newBudgetForm.valid) {
      var NBF = this.newBudgetForm;
      const id = null;
      const budgetName = NBF.get('budgetName');
      const initailAmount = NBF.get('initailAmount');
      const endDate = NBF.get('endDate');
      const monthlyIncome = NBF.get('monthlyIncome');

      const newBudget = new NewBudget(
        id,
        budgetName.value,
        initailAmount.value,
        endDate.value,
        monthlyIncome.value
      );
      this.onAddBudget(newBudget);
      NBF.reset();
    } else {
      alert('Please enter all fields corectlly');
    }
  }

  onAddBudget(newBudget: NewBudget) {
    this.newBudgetService.addBudget(newBudget);
  }
}
