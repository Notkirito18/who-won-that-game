import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideScoreComponent } from './provide-score.component';

describe('ProvideScoreComponent', () => {
  let component: ProvideScoreComponent;
  let fixture: ComponentFixture<ProvideScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
