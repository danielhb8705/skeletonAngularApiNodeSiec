import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanzasComponent } from './balanzas.component';

describe('BalanzasComponent', () => {
  let component: BalanzasComponent;
  let fixture: ComponentFixture<BalanzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
