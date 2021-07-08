import { Pipe, PipeTransform } from '@angular/core';

const guards = ['HighPriorityGuard', 'LowPriorityGuard'];

@Pipe({
  name: 'guardFrom',
})
export class GuardFromPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) {
      return '';
    }
    return `from ${guards[value]}`;
  }
}
