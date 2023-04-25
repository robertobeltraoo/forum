import { Field, ObjectType } from '@nestjs/graphql';
import bcryptjs from 'bcryptjs';
import { BeforeCreate, Column, DefaultScope, Model, Table } from 'sequelize-typescript';
import { IUser } from '../../../shared/interfaces/user';

@ObjectType()
@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Table({
  modelName: 'users',
  underscored: true,
  paranoid: true,
})
export class User extends Model<User> implements IUser {
  @Field()
  id?: number;

  @Field()
  @Column
  name: string;

  @Field()
  @Column
  email: string;

  @Field()
  @Column
  password: string;

  @BeforeCreate
  static async beforeCreateHook(user: User): Promise<void> {
    user.password = await bcryptjs.hash(user.password, 10);
  }

  comparePassword(attempt: string): Promise<boolean> {
    return bcryptjs.compare(attempt, this.password);
  }
}
