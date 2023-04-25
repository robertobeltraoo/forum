import { CreateCodePostInput } from './create-code-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCodePostInput extends PartialType(CreateCodePostInput) {
  @Field(() => Int)
  id: number;
}
