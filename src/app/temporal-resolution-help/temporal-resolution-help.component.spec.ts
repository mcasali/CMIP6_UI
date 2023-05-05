import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalResolutionHelpComponent } from './temporal-resolution-help.component';

describe('TemporalResolutionHelpComponent', () => {
  let component: TemporalResolutionHelpComponent;
  let fixture: ComponentFixture<TemporalResolutionHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporalResolutionHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalResolutionHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
