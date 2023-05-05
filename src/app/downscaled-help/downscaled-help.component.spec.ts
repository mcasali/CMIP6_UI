import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownscaledHelpComponent } from './downscaled-help.component';

describe('DownscaledHelpComponent', () => {
  let component: DownscaledHelpComponent;
  let fixture: ComponentFixture<DownscaledHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownscaledHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownscaledHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
