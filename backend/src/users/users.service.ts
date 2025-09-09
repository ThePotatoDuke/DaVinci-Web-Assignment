import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Mustafa Tozman',
      username: 'PotatoDuke',
      email: 'mtozman03@gmail.com',
    },
    {
      id: 2,
      name: 'Erdem Alpay',
      username: 'erdemalpay',
      email: 'erdemalpay@gmail.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }
  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  create(user: Partial<User>): User {
    const newUser: User = {
      id: this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1,
      name: user.name || 'Unknown',
      username: user.username || 'unknown',
      email: user.email || '',
    };

    this.users.push(newUser);
    return newUser;
  }
  update(id: number, update: Partial<UpdateUserDto>): User {
    const user = this.findOne(id); // will throw if not found
    Object.assign(user, update);
    return user;
  }
  remove(id: number): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
