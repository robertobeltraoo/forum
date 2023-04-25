import { Test, TestingModule } from '@nestjs/testing';
import { CodePostResolver } from './code-post.resolver';
import { CodePostService } from './code-post.service';

describe('CodePostResolver', () => {
  let resolver: CodePostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodePostResolver, CodePostService],
    }).compile();

    resolver = module.get<CodePostResolver>(CodePostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
