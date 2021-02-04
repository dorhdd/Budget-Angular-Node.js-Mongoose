export class Expenditure {
  constructor(
    public financialType: string,
    public amount: number,
    public description: string,
    public _id?: any
  ) {
    this.financialType = financialType;
    this.amount = amount;
    this.description = description;
    this._id = _id;
  }
}
