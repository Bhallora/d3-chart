import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdReusableComponentComponent } from './rd-reusable-component.component';

describe('RdReusableComponentComponent', () => {
  let component: RdReusableComponentComponent;
  let fixture: ComponentFixture<RdReusableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdReusableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdReusableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
