import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDprComponent } from './submit-dpr.component';

describe('SubmitDprComponent', () => {
  let component: SubmitDprComponent;
  let fixture: ComponentFixture<SubmitDprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitDprComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitDprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
