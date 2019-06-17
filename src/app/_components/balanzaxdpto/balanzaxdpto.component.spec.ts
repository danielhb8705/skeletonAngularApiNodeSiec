import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanzaxdptoComponent } from './balanzaxdpto.component';

describe('BalanzaxdptoComponent', () => {
  let component: BalanzaxdptoComponent;
  let fixture: ComponentFixture<BalanzaxdptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanzaxdptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanzaxdptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
