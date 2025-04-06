import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { passwordToHash } from 'src/utils/crypto/transform';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await passwordToHash(createUserDto.password);
    const userToSave = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const userCreated: User = await this.userRepository.save(userToSave);
      return instanceToPlain(userCreated);
    } catch (err) {
      throw new InternalServerErrorException('Erro ao cadastrar usuário.');
    }
  }

  async findAll() {
    try {
      const userList = await this.userRepository.find();
      return instanceToPlain(userList);
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao buscar a lista de usuários.',
      );
    }
  }

  async findOneByID(id: string) {
    try {
      const userFound: User | null = await this.userRepository.findOne({
        where: { id },
      });

      return userFound;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao buscar usuário por id.');
    }
  }

  async findOneByEmailOrEmployeeID(register: string) {
    try {
      const userFound: User | null = await this.userRepository.findOne({
        where: [{ email: register }, { employee_id: register }],
      });

      return userFound;
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao buscar usuário por e-mail/matrícula',
      );
    }
  }

  async findManyByName(name: string) {
    try {
      const usersList: User[] = await this.userRepository.find({
        where: { name: Like(`%${name}%`) },
      });

      return usersList;
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao buscar usuários por nome.',
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
