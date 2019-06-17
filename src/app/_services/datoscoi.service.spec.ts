import { TestBed } from '@angular/core/testing';

import { DatoscoiService } from './datoscoi.service';

describe('DatoscoiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatoscoiService = TestBed.get(DatoscoiService);
    expect(service).toBeTruthy();
  });
});
