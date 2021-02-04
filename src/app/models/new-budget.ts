export class NewBudget {
  constructor(
    public _id: string,
    public budgetName: string,
    public initailAmount: number,
    public endDate: string,
    public monthlyIncome: number,
  ) {
    this.budgetName = budgetName;
    this.initailAmount = initailAmount;
    this.endDate = endDate;
    this.monthlyIncome = monthlyIncome;
    this._id = _id;
  }
}
