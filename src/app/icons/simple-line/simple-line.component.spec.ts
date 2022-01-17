import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleLineComponent } from './simple-line.component';

describe('SimpleLineComponent', () => {
  let component: SimpleLineComponent;
  let fixture: ComponentFixture<SimpleLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleLineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
