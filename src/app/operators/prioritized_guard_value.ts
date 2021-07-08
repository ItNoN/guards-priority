import {
  combineLatest,
  filter,
  map,
  Observable,
  OperatorFunction,
  scan,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { UrlTree } from '@angular/router';
import { GuardsService } from '../guards.service';

// Modified prioritizedGuardValue function to explain the result of guard prioritization

const INITIAL_VALUE = Symbol('INITIAL_VALUE');
declare type INTERIM_VALUES = typeof INITIAL_VALUE | boolean | UrlTree;

export function prioritizedGuardValue(
  guardService: GuardsService
): OperatorFunction<Observable<boolean | UrlTree>[], boolean | UrlTree> {
  return switchMap(obs => {
    return combineLatest(
      obs.map(o => o.pipe(take(1), startWith(INITIAL_VALUE as INTERIM_VALUES)))
    ).pipe(
      scan((acc: INTERIM_VALUES, list: INTERIM_VALUES[]) => {
        let isPending = false;
        return list.reduce((innerAcc, val, i: number) => {
          if (innerAcc !== INITIAL_VALUE) {
            guardService.guardResultNumber.next(i - 1);
            return innerAcc;
          }

          // Toggle pending flag if any values haven't been set yet
          if (val === INITIAL_VALUE) isPending = true;

          // Any other return values are only valid if we haven't yet hit a pending
          // call. This guarantees that in the case of a guard at the bottom of the
          // tree that returns a redirect, we will wait for the higher priority
          // guard at the top to finish before performing the redirect.
          if (!isPending) {
            // Early return when we hit a `false` value as that should always
            // cancel navigation
            if (val === false || isUrlTree(val)) {
              guardService.guardResultNumber.next(i);
              return val;
            }

            if (i === list.length - 1) {
              guardService.guardResultNumber.next(i);
              return val;
            }
          }

          return innerAcc;
        }, acc);
      }, INITIAL_VALUE),
      filter(item => item !== INITIAL_VALUE),
      map(item => (isUrlTree(item) ? item : item === true)),
      take(1)
    ) as Observable<boolean | UrlTree>;
  });
}

export function isUrlTree(v: any): v is UrlTree {
  return v instanceof UrlTree;
}
