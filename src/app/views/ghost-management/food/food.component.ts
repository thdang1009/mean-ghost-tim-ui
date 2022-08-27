import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MealService } from '@services/_index';
import { Meal } from '@models/_index';
import * as dateFns from 'date-fns'


/*
css theo tier
đổi date picker lại thành range
thêm list món ăn theo tier và để backend tự động update tier theo content

*/
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  data: Meal[] = [];
  isLoadingResults = true;

  today = dateFns.startOfToday();
  searchDate = new UntypedFormControl(this.today);
  searchDateDisplay = 'ToDay';
  tierList = [
    'NONE',
    'S',
    'A',
    'B',
    'C',
    'D',
  ];
  searchTier = this.tierList[0];

  constructor(
    private mealService: MealService
  ) { }

  ngOnInit(): void {
    this.searchMeal();
  }
  addMeal() {
    const value = this.searchDate && this.searchDate.value || new Date();
    const fromDate = dateFns.startOfDay(value);
    fromDate.setHours(12);
    const sample: Meal = {
      createTime: fromDate,
      content: ''
    }
    this.isLoadingResults = true;
    this.mealService.addMeal(sample)
      .subscribe((res: any) => {
        this.data.push(res);
        this.isLoadingResults = false;
      }, err => {
        // console.log(err);
        this.isLoadingResults = false;
      });
  }

  searchMeal() {
    this._getMyMeal();
  }

  _getMyMeal() {
    const value = this.searchDate && this.searchDate.value || new Date();
    const fromDate = dateFns.startOfDay(value);
    const toDate = dateFns.endOfDay(value);
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
      tier: this.searchTier === 'NONE' ? undefined : this.searchTier
    }
    this.isLoadingResults = true;
    this.mealService.getMyMeal(req)
      .subscribe((res: any) => {
        this.data = res
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });

  }

  saveItem(id, item, index) {
    this.isLoadingResults = true;
    item.content = item.content.trim();
    this.mealService.updateMeal(id, item)
      .subscribe((res: any) => {
        this.data[index] = res;
        // update to debouce call api
        this._getMyMeal();
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  deleteLast() {
    this.isLoadingResults = true;
    if (!this.data || !this.data.length) {
      return;
    }
    const lastIndex = this.data.length - 1;
    const id = this.data[lastIndex].id;
    if (id) {
      this.mealService.deleteMeal(id)
        .subscribe((_: any) => {
          this.data.pop();
          // update to debouce call api
          this._getMyMeal();
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
  delete(id) {
    this.isLoadingResults = true;
    if (!this.data || !this.data.length) {
      return;
    }
    if (id) {
      this.mealService.deleteMeal(id)
        .subscribe((_: any) => {
          // this.data.pop();
          // update to debouce call api
          this._getMyMeal();
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }

}
