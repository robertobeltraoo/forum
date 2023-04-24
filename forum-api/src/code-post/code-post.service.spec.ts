import { Test, TestingModule } from '@nestjs/testing';
import { CodePostService } from './code-post.service';

describe('CodePostService', () => {
  let service: CodePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodePostService],
    }).compile();

    service = module.get<CodePostService>(CodePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
