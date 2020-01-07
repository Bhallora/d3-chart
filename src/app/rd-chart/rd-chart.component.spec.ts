import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdChartComponent } from './rd-chart.component';

describe('RdChartComponent', () => {
  let component: RdChartComponent;
  let fixture: ComponentFixture<RdChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
