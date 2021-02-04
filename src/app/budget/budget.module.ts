import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CurrentBudgetComponent } from './main/current-budget/current-budget.component';
import { ExpendituresComponent } from './main/expenditures/expenditures.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CalcComponent } from './calc/calc.component';

@NgModule({
  declarations: [
    MainComponent,
    NewBudgetComponent,
    BudgetListComponent,
    SidebarComponent,
    CurrentBudgetComponent,
    ExpendituresComponent,
    CalcComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    MainComponent,
    NewBudgetComponent,
    BudgetListComponent,
    SidebarComponent,
  ],
})
export class BudgetModule {}
