import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarActionsComponent } from './car-actions.component';

describe('CarActionsComponent', () => {
  let component: CarActionsComponent;
  let fixture: ComponentFixture<CarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
