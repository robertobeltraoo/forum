import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

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
    comparePassword: jest.fn(),
    destroy: jest.fn(),
  };

  const mockUpdateUserDto: UpdateUserDto = {
    id: 1,
    name: 'Robertão',
    password: '123robertinho',
    oldPassword: 'robertinho123',
  };

  const mockUpdatedUser = {
    id: 1,
    name: 'Robertão',
    email: 'robertinho@gmail.com',
    password: '$2b$10$Ouq0nnxtmTfB9KgbQxr8Ge0PKBcFrdFoSa3YMOB/Mz22ogkvEgh7u',
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
    it('should findAll users', async () => {
      mockRepository.findAll.mockResolvedValueOnce([mockUser]);
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
    });

    it('should throw error', async () => {
      mockRepository.findAll.mockRejectedValueOnce(new Error());
      await service.findAll().catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Falha ao buscar usuários.');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('findOne User', () => {
    it('should findOne user', async () => {
      mockRepository.findByPk.mockResolvedValueOnce(mockUser);
      const result = await service.findOne(mockUser.id);
      expect(result).toEqual(mockUser);
    });
  });

  it('should throw user not exists', async () => {
    mockRepository.findByPk.mockResolvedValueOnce(null);
    await service.findOne(mockUser.id).catch((error) => {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Usuário não encontrado.');
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  it('should throw error', async () => {
    mockRepository.findByPk.mockRejectedValueOnce(new Error());
    await service.findOne(mockUser.id).catch((error) => {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Falha ao buscar usuário.');
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  describe('update User', () => {
    it('should update user', async () => {
      mockRepository.findByPk.mockResolvedValueOnce(mockUser);
      mockUser.comparePassword.mockResolvedValueOnce(Promise.resolve(true));
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => '$2b$10$Ouq0nnxtmTfB9KgbQxr8Ge0PKBcFrdFoSa3YMOB/Mz22ogkvEgh7u');
      mockUser.update.mockResolvedValueOnce(mockUpdatedUser);
      const result = await service.update(mockUpdateUserDto);
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw user not exist', async () => {
      mockUser.update.mockResolvedValueOnce(mockUpdatedUser);
      await service.update(mockUpdateUserDto).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Usuário não encontrado.');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
      });
    });

    it('should throw error old password', async () => {
      mockRepository.findByPk.mockResolvedValueOnce(mockUser);
      mockUser.comparePassword.mockResolvedValue(Promise.resolve(false));
      await service.update(mockUpdateUserDto).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Senha incorreta.');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      });
    });

    it('should throw error', async () => {
      mockRepository.findByPk.mockResolvedValueOnce(mockUser);
      mockUser.update.mockRejectedValueOnce(new Error());
      await service.update(mockUpdateUserDto).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Falha ao atualizar usuário.');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('remove User', () => {
    it('should remove user', async () => {
      const message = 'Usuário deletado com sucesso.';
      mockRepository.findByPk.mockResolvedValueOnce(mockUser);
      mockUser.destroy.mockResolvedValueOnce(true);
      const result = await service.remove(mockUser.id);
      expect(result).toEqual({ message });
    });

    it('should throw user not exist', async () => {
      mockUser.destroy.mockResolvedValueOnce(null);
      await service.remove(mockUser.id).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Usuário não encontrado.');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
      });
    });

    it('should throw error', async () => {
      mockRepository.findByPk.mockResolvedValueOnce(mockUser);
      mockUser.destroy.mockRejectedValueOnce(new Error());
      await service.remove(mockUser.id).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Falha ao deletar usuário.');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      });
    });
  });
});
