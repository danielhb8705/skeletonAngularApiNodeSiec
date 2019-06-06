import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navigationStatus = new Subject();

  constructor() { }

  openNavigation() {
    this.navigationStatus.next(true);
  }

  closeNavigation() {
    this.navigationStatus.next(false);
  }
}
