import { Pipe, PipeTransform } from '@angular/core';
import { EUserGroupStatus } from '../enum/user-group-status.enum';

@Pipe({
  name: 'userGroupStatus'
})
export class UserGroupStatusPipe implements PipeTransform {

  transform(value: EUserGroupStatus, ...args: unknown[]): unknown {
    switch (value) {
      case EUserGroupStatus.AUTHOR:
        return 'Автор';
      case EUserGroupStatus.INVITED:
        return 'Приглашен';
      case EUserGroupStatus.REFUSE:
        return 'Отказался';
      default:
        return 'Участник'
    }
  }

}
