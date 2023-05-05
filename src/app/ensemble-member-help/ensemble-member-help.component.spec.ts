import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsembleMemberHelpComponent } from './ensemble-member-help.component';

describe('EnsembleMemberHelpComponent', () => {
  let component: EnsembleMemberHelpComponent;
  let fixture: ComponentFixture<EnsembleMemberHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsembleMemberHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsembleMemberHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
