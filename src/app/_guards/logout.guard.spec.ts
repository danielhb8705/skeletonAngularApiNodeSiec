import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {OutGuard} from "./logout.guard";

describe('OutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
