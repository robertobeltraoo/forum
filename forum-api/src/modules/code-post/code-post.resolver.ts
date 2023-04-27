import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CodePostService } from './code-post.service';
import { CodePost } from './models/code-post.model';
import { CreateCodePostInput } from './dto/create-code-post.dto';
import { UpdateCodePostInput } from './dto/update-code-post.dto';

@Resolver(() => CodePost)
export class CodePostResolver {
  constructor(private readonly codePostService: CodePostService) {}

  @Mutation(() => CodePost)
  createCodePost(@Args('createCodePostInput') createCodePostInput: CreateCodePostInput) {
    return this.codePostService.create(createCodePostInput);
  }

  @Query(() => [CodePost], { name: 'codePost' })
  findAll() {
    return this.codePostService.findAll();
  }

  @Query(() => CodePost, { name: 'codePost' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.codePostService.findOne(id);
  }

  @Mutation(() => CodePost)
  updateCodePost(@Args('updateCodePostInput') updateCodePostInput: UpdateCodePostInput) {
    return this.codePostService.update(updateCodePostInput.id, updateCodePostInput);
  }

  @Mutation(() => CodePost)
  removeCodePost(@Args('id', { type: () => Int }) id: number) {
    return this.codePostService.remove(id);
  }
}
