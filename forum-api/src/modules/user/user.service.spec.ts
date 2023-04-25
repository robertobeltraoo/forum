import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockCreateUserDto: CreateUserDto = {
    name: 'Roberto',
    email: 'robertinho@gmail.com',
    password: 'robertinho123',
  };

  const mockUser = {
    id: 1,
    name: 'Roberto',
    email: 'robertinho@gmail.com',
    password: 'robertinho123',
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockUpdateUserDto: UpdateUserDto = {
    id: 1,
    name: 'Robertão',
  };

  const mockUpdatedUser = {
    id: 1,
    name: 'Robertão',
    email: 'robertinho@gmail.com',
    password: 'robertinho123',
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockRepository = {
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getModelToken(User), useValue: mockRepository }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    it('should create a user', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      mockRepository.create.mockResolvedValueOnce(mockUser);
      const result = await service.create(mockCreateUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should throw already exists', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockUser);
      await service.create(mockCreateUserDto).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Email já existe.');
        expect(error.status).toEqual(HttpStatus.CONFLICT);
      });
    });

    it('should throw error', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      mockRepository.create.mockRejectedValueOnce(new Error());
      await service.create(mockCreateUserDto).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Falha ao criar usuário.');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('findAll users', () => {
    it('', async () => {
      expect(true).toBe(true);
    });
  });
});
