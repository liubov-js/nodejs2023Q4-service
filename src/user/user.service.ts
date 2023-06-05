import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDb } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDb) {}

  getUsers() {
    return this.db.users;
  }

  getOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  createUser(dto: CreateUserDto) {
    const date = Date.now();
    const user = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.db.users.push(user);
    return user;
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong current password');
    }
    user.version += 1;
    user.password = dto.newPassword;
    user.updatedAt = Date.now();
    return user;
  }

  deleteUser(id: string) {
    const userIdx = this.db.users.findIndex((user) => user.id === id);
    if (userIdx === -1) {
      throw new NotFoundException('User not found');
    }
    return this.db.users.splice(userIdx, 1);
  }
}
