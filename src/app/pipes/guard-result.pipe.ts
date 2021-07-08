import { Pipe, PipeTransform } from '@angular/core';
import { UrlTree } from '@angular/router';

@Pipe({
  name: 'guardResult',
})
export class GuardResultPipe implements PipeTransform {
  transform(value: boolean | UrlTree | undefined | null): unknown {
    if (value == null) {
      return '—';
    }

    return value instanceof UrlTree ? 'UrlTree' : value;
  }
}
