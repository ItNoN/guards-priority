import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-guard-form',
  templateUrl: './guard-form.component.html',
  styleUrls: ['./guard-form.component.css'],
})
export class GuardFormComponent implements OnInit {
  @Input() title = '';

  @Input() set value(value: boolean | UrlTree) {
    this.valueFormControl.setValue(value);
  }

  @Input() set delay(value: number) {
    this.delayFormControl.setValue(value);
  }

  @Output() valueChange: EventEmitter<boolean | UrlTree> = new EventEmitter<
    boolean | UrlTree
  >();
  @Output() delayChange: EventEmitter<number> = new EventEmitter<number>();

  delayFormControl = new FormControl<number>(0);
  valueFormControl = new FormControl<boolean | UrlTree>(false);

  constructor(private readonly router: Router) {}

  get urlTree(): UrlTree {
    return this.router.createUrlTree(['/']);
  }

  ngOnInit(): void {
    this.delayFormControl.valueChanges.subscribe(delay =>
      this.delayChange.emit(delay!)
    );

    this.valueFormControl.valueChanges.subscribe(value =>
      this.valueChange.emit(value!)
    );
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 's';
    }

    return value;
  }
}
