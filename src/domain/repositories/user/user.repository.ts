import { User } from 'prisma/generated/client';

export interface UserRepository {
  create(user: { name: string; email: string; password: string }): Promise<User>;
  findAll(): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
