import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { CalcComponent } from './budget/calc/calc.component';
import { MainComponent } from './budget/main/main.component';
import { NewBudgetComponent } from './budget/new-budget/new-budget.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthComponent } from './user/auth/auth.component';
import { AuthGuard } from './user/auth/auth.guard';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ResetComponent } from './user/reset/reset.component';
import { NewPassComponent } from './user/auth/new-pass/new-pass.component';
import { NewPassResolver } from './user/auth/new-pass/new-pass.resolver';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
  },
  {
    path: 'newpass/:token',
    component: NewPassComponent,
    resolve: {
      data: NewPassResolver,
    },
  },
  {
    path: 'reset',
    component: ResetComponent,
    pathMatch: 'full',
  },
  {
    path: 'newBudget',
    component: NewBudgetComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'budgetList',
    component: BudgetListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'calc',
    component: CalcComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: ErrorComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
