import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';


@Pipe({
  name: 'searchUser'
})
export class SearchPipe implements PipeTransform {
  public userObj: string | any;

  transform(users: User[], search = ''): User[] {
    if (!search.trim()) {
      return users
    }

    return users.filter(user => {
      this.userObj = Object.values(user)[0];
      return this.userObj.firstName.toLowerCase().includes(search.toLowerCase());
    });
  };

}
