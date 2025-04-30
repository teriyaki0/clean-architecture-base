import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import { PrismaService } from '../prisma.service';
import { RedisCacheService } from 'src/infrastructure/data/cache/redis.service';
import { User } from 'prisma/generated/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
  ) {}

  create({ name, email, password }): Promise<User> {
    return this.prisma.user.create({ data: { name, email, password } });
  }

  async findAll(): Promise<User[] | null> {
    const cacheKey = 'users';
    let users: User[] | null = null;

    users = await this.cacheService.get<User[]>(cacheKey);

    if (!users) {
      users = await this.prisma.user.findMany();
      if (users.length) {
        await this.cacheService.set(cacheKey, users, 300);
      }
    }
    return users;
  }

  async findById(id: string): Promise<User | null> {
    const cacheKey = `user:${id}`;
    let user: User | null = null;

    user = await this.cacheService.get<User>(cacheKey);

    if (!user) {
      user = await this.prisma.user.findUnique({ where: { id } });
      if (user) {
        await this.cacheService.set(cacheKey, user, 300);
      }
    }
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });
    await this.cacheService.del(`user:${id}`);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
    await this.cacheService.del(`user:${id}`);
  }
}
