import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErXCcXDepartamentoComponent } from './er-x-cc-x-departamento.component';

describe('ErXCcXDepartamentoComponent', () => {
  let component: ErXCcXDepartamentoComponent;
  let fixture: ComponentFixture<ErXCcXDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErXCcXDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErXCcXDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
