import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Expenditure } from 'src/app/models/expenditure';
import { MainService } from '../main.service';
import { ErrorsService } from 'src/app/errors.service';
import { NewBudget } from 'src/app/models/new-budget';

@Component({
  selector: 'app-current-budget',
  templateUrl: './current-budget.component.html',
  styleUrls: ['./current-budget.component.css'],
})
export class CurrentBudgetComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private errorsService: ErrorsService
  ) {}
  budgetDetails: NewBudget = {
    _id: '',
    budgetName: '',
    initailAmount: 0,
    endDate: '',
    monthlyIncome: 0,
  };
  budgetForm: FormGroup;
  errors: [{ msg: string }];

  ngOnInit(): void {
    this.budgetFunc();
    this.amountCalc();
    this.errorsService.errors.subscribe((errors) => (this.errors = errors));
  }



  amountCalc() {
    this.mainService.expenditureSub.subscribe((obj) => {
      this.mainService.getBudget().subscribe((budget) => {
        this.budgetDetails = budget;
        for (let exSum of obj) {
          this.budgetDetails.initailAmount = eval(
            `${this.budgetDetails.initailAmount}${exSum.financialType}${exSum.amount}`
          );
        }
      });
    });
  }

  private budgetFunc() {
    this.budgetForm = new FormGroup({
      financialType: new FormControl('+', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const financialType = this.budgetForm.get('financialType');
      const amount = this.budgetForm.get('amount');
      const description = this.budgetForm.get('description');

      const expenditure = new Expenditure(
        financialType.value,
        amount.value,
        description.value
      );
      this.onPushExpenditure(expenditure);
      this.resetValues(amount, description);
    } else {
      alert('Please enter all fields corectlly');
    }
  }

  onPushExpenditure(expenditure: Expenditure) {
    this.mainService.saveExpenditure(expenditure);
  }

  resetValues(amount: AbstractControl, description: AbstractControl) {
    if (this.errors === undefined) {
      amount.reset();
      description.reset();
    }
  }
}
