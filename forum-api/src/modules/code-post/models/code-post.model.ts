import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Table } from 'sequelize-typescript';
import { toUSVString } from 'util';

@ObjectType()
@Table({
  modelName: 'code-post',
  underscored: true,
  paranoid: true,
})
export class CodePost {
  @Field()
  id?: number;

  @Field()
  @Column
  title: string;

  @Field()
  @Column
  describle: string;

  @Field()
  @Column
  code: string;

  @Field()
  @Column
  color: number;

  @Field()
  @Column
  technology: number;

  @Field()
  @Column
  like: number;
}
