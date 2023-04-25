import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const mockCreateUserDto: CreateUserDto = {
    name: 'Roberto',
    email: 'robertinho@gmail.com',
    password: 'robertinho123',
  };

  const mockUpdateUserDto: UpdateUserDto = {
    id: 1,
    name: 'Roberto',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getModelToken(User),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call create user', () => {
    const createSpy = jest.spyOn(service, 'create').mockImplementation();
    resolver.createUser(mockCreateUserDto);
    expect(createSpy).toBeCalledWith(mockCreateUserDto);
  });

  it('should call findAll users', () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockImplementation();
    resolver.findAll();
    expect(findAllSpy).toBeCalled();
  });

  it('should call findOne user', () => {
    const findOneSpy = jest.spyOn(service, 'findOne').mockImplementation();
    resolver.findOne(1);
    expect(findOneSpy).toBeCalledWith(1);
  });

  it('should call update user', () => {
    const updateSpy = jest.spyOn(service, 'update').mockImplementation();
    resolver.updateUser(mockUpdateUserDto);
    expect(updateSpy).toBeCalledWith(mockUpdateUserDto);
  });

  it('should call findOne user', () => {
    const removeSpy = jest.spyOn(service, 'remove').mockImplementation();
    resolver.removeUser(1);
    expect(removeSpy).toBeCalledWith(1);
  });
});
