import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {User} from "./_models";
import {AuthenticationService, NavigationService} from "./_services";
import {MatDrawer, MatMenu, MatProgressBar} from "@angular/material";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  app_name = 'skeleton';
  currentUser: User;
  navSubscription: Subscription;
  @Input() outlet:RouterOutlet;
  @ViewChild(MatDrawer) drawer: MatDrawer;
  @ViewChild(MatMenu) menu: MatMenu;
  constructor(
      private router: Router,
      private authService:AuthenticationService,
      private navigationService: NavigationService
  ) {

    this.authService.currentSession.subscribe(x => this.currentUser = x);

  }
  ngOnInit()
  {
    this.navSubscription = this.navigationService.navigationStatus.subscribe((value: boolean) => {
      if (value) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    });
  }
  ngOnDestroy(): void {
    this.navSubscription.unsubscribe();
  }

  onActivate(component){
    if(this.router.url != '/login')
    {
      component.currentUser = this.currentUser;
    }

  }
}
