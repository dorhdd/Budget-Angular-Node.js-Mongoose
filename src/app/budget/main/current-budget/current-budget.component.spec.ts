import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentBudgetComponent } from './current-budget.component';

describe('CurrentBudgetComponent', () => {
  let component: CurrentBudgetComponent;
  let fixture: ComponentFixture<CurrentBudgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
