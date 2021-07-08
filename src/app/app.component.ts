import { Component } from '@angular/core';
import { GuardsService } from './guards.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  highResult$: Observable<boolean | UrlTree | undefined> =
    this.guardsService.highPriorityGuardResult;
  lowResult$: Observable<boolean | UrlTree | undefined> =
    this.guardsService.lowPriorityGuardResult;
  guardResult$: Observable<boolean | UrlTree | undefined> =
    this.guardsService.guardResult;

  guardResultNumber$: Observable<number | undefined> =
    this.guardsService.guardResultNumber;

  navigationLoading$ = this.guardsService.navigationLoading$;

  constructor(private readonly guardsService: GuardsService) {}

  clear(): void {
    this.guardsService.clear();
  }

  onHighPriorityDelayChange(value: number) {
    this.guardsService.highPriorityGuardDelay = value;
  }

  onHighPriorityValueChange(value: UrlTree | boolean) {
    this.guardsService.highPriorityGuardValue = value;
  }

  onLowPriorityDelayChange(value: number) {
    this.guardsService.lowPriorityGuardDelay = value;
  }

  onLowPriorityValueChange(value: UrlTree | boolean) {
    this.guardsService.lowPriorityGuardValue = value;
  }
}
