import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Example4Component } from './example4.component';

describe('Example4Component', () => {
  let component: Example4Component;
  let fixture: ComponentFixture<Example4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Example4Component]
    });
    fixture = TestBed.createComponent(Example4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
