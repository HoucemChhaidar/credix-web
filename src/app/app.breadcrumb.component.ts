import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    items: MenuItem[];

    firstName: string = '';


    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }
  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.firstName = user.firstName; // récupère le prénom
    }
  }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
