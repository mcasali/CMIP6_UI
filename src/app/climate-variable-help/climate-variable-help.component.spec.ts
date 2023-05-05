import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateVariableHelpComponent } from './climate-variable-help.component';

describe('ClimateVariableHelpComponent', () => {
  let component: ClimateVariableHelpComponent;
  let fixture: ComponentFixture<ClimateVariableHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimateVariableHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateVariableHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
