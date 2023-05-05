import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSimulationHelpComponent } from './model-simulation-help.component';

describe('ModelSimulationHelpComponent', () => {
  let component: ModelSimulationHelpComponent;
  let fixture: ComponentFixture<ModelSimulationHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSimulationHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSimulationHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
