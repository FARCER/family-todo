import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userGroupStatus'
})
export class UserGroupStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value)
    switch (value) {
      case 'author':
        return 'Автор';
      case 'invited':
        return 'Приглашен';
      default:
        return 'Участник'
    }
  }

}
