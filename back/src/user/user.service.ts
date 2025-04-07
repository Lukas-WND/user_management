import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { passwordToHash } from 'src/utils/crypto/transform';
import { compare } from 'bcrypt';

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneByID(id);

    if (!user) return;

    try {
      // Se for atualizar a senha
      if (updateUserDto.newPassword) {
        if (!updateUserDto.password) {
          throw new BadRequestException('A senha atual é obrigatória.');
        }

        const isPasswordCorrect = await compare(
          updateUserDto.password,
          user.password,
        );

        if (!isPasswordCorrect) {
          throw new BadRequestException('A senha atual está incorreta.');
        }

        user.password = await passwordToHash(updateUserDto.newPassword);
      }

      // Atualiza outros campos se fornecidos
      if (updateUserDto.name) user.name = updateUserDto.name;
      if (updateUserDto.email) user.email = updateUserDto.email;
      if (updateUserDto.employee_id)
        user.employee_id = updateUserDto.employee_id;

      const updatedUser = await this.userRepository.save(user);
      return instanceToPlain(updatedUser);
    } catch (err) {
      throw new InternalServerErrorException('Erro ao atualizar usuário');
    }
  }

  async remove(id: string) {
    const user = await this.findOneByID(id);

    try {
      return await this.userRepository.delete(user!.id);
    } catch (err) {
      throw new InternalServerErrorException('Erro ao deletar usuário.');
    }
  }
}
