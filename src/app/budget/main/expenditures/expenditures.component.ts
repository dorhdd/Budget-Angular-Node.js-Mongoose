import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenditure } from 'src/app/models/expenditure';
import { MainService } from '../main.service';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.css'],
})
export class ExpendituresComponent implements OnInit {
  constructor(private mainService: MainService) {}
  expenditures: Expenditure[] = [];

  ngOnInit(): void {
    this.onGetExpenditure();
    this.onSubscription();
  }

  onSubscription() {
    this.mainService.expenditureSub.subscribe((expenditures) => {      
      this.expenditures = expenditures;
    });
  }

  onGetExpenditure() {
    this.mainService.getExpenditure();
  }

  onDeleteExpenditure(id: any) {
    this.mainService.deleteExpenditure(id);
  }
}
