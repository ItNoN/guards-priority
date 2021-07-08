import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { LowPriorityGuard } from './low-priority.guard';
import { prioritizedGuardValue } from '../operators/prioritized_guard_value';
import { HighPriorityGuard } from './high-priority.guard';
import { GuardsService } from '../guards.service';

@Injectable({
  providedIn: 'root',
})
export class ResultGuard implements CanActivate {
  constructor(
    private readonly highPriorityGuard: HighPriorityGuard,
    private readonly lowPriorityGuard: LowPriorityGuard,
    private readonly guardService: GuardsService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return of([
      this.highPriorityGuard.canActivate(),
      this.lowPriorityGuard.canActivate(),
    ]).pipe(
      prioritizedGuardValue(this.guardService),
      tap(value => this.guardService.guardResult.next(value))
    );
  }
}
