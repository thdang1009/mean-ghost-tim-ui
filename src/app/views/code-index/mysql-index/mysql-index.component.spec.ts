import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqlIndexComponent } from './mysql-index.component';

describe('MysqlIndexComponent', () => {
  let component: MysqlIndexComponent;
  let fixture: ComponentFixture<MysqlIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysqlIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysqlIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
