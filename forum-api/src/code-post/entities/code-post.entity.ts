import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CodePost {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
