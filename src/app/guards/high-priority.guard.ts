import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { map, Observable, of, tap, timer } from 'rxjs';
import { GuardsService } from '../guards.service';

@Injectable({
  providedIn: 'root',
})
export class HighPriorityGuard implements CanActivate {
  constructor(private readonly guardService: GuardsService) {}

  canActivate(): Observable<boolean | UrlTree> {
    const timerValue = this.guardService.highPriorityGuardDelay;

    return timer(timerValue).pipe(
      map(() => this.guardService.highPriorityGuardValue),
      tap(value => this.guardService.highPriorityGuardResult.next(value))
    );
  }
}
