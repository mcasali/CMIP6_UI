import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatHelpComponent } from './format-help.component';

describe('FormatHelpComponent', () => {
  let component: FormatHelpComponent;
  let fixture: ComponentFixture<FormatHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
