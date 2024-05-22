import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPPRComponent } from './submit-ppr.component';

describe('SubmitPPRComponent', () => {
  let component: SubmitPPRComponent;
  let fixture: ComponentFixture<SubmitPPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitPPRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitPPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
