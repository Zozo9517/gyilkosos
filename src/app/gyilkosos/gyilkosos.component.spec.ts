import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyilkososComponent } from './gyilkosos.component';

describe('GyilkososComponent', () => {
  let component: GyilkososComponent;
  let fixture: ComponentFixture<GyilkososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GyilkososComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GyilkososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
