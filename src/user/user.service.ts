import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: Array<User> = [
    {
      id: 1,
      userName: 'john',
      email: 'john@john.com.br',
      password: '123456',
      fullName: 'Jonathan Rocha',
      joinDate: new Date(),
    },
  ];

  public create(user: User): User {
    this.users.push(user);

    return user;
  }

  public getUserName(userName: string): User {
    return this.users.find((user) => user.userName == userName);
  }
}
