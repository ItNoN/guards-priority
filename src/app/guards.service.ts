import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
  UrlTree,
} from '@angular/router';
import { filter, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardsService {
  highPriorityGuardResult = new Subject<boolean | UrlTree | undefined>();
  lowPriorityGuardResult = new Subject<boolean | UrlTree | undefined>();

  guardResult = new Subject<boolean | UrlTree | undefined>();
  guardResultNumber = new Subject<number | undefined>();

  highPriorityGuardValue: boolean | UrlTree = true;
  lowPriorityGuardValue: boolean | UrlTree = false;

  highPriorityGuardDelay: number = 2000;
  lowPriorityGuardDelay: number = 0;

  navigationLoading$ = this.router.events.pipe(
    filter(
      event =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
    ),
    map(event => event instanceof NavigationStart)
  );

  constructor(private readonly router: Router) {}

  clear(): void {
    this.highPriorityGuardResult.next(undefined);
    this.lowPriorityGuardResult.next(undefined);
    this.guardResult.next(undefined);
    this.guardResultNumber.next(undefined);
  }
}
