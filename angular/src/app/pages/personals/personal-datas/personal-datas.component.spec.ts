import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDatasComponent } from './personal-datas.component';

describe('PersonalDatasComponent', () => {
  let component: PersonalDatasComponent;
  let fixture: ComponentFixture<PersonalDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
