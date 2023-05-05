import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHelpComponent } from './global-help.component';

describe('GlobalHelpComponent', () => {
  let component: GlobalHelpComponent;
  let fixture: ComponentFixture<GlobalHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
