import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @description a method to
   * @param userList an array of Users
   * @returns a list of users without the 'password' field
   */
  hidePasswordOfAListOfUsers(userList: User[]) {
    const listWithoutPasswordField: Omit<User, 'password'>[] = userList.map(
      (user: User) => {
        const { password, ...result } = user;

        return result;
      },
    );

    return listWithoutPasswordField;
  }

  async create(createUserDto: CreateUserDto) {
    const userCreated: User = this.userRepository.create(createUserDto);
    try {
      return await this.userRepository.save(userCreated);
    } catch (err) {
      throw new InternalServerErrorException('Erro ao cadastrar usuário.');
    }
  }

  async findAll() {
    try {
      const userList = await this.userRepository.find();
      console.log(userList)
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

  async findOneByEmail(email: string) {
    try {
      const userFound: User | null = await this.userRepository.findOne({
        where: { email },
      });

      return userFound;
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao buscar usuário por nome.',
      );
    }
  }

  async findManyByName(name: string) {
    try {
      const usersList: User[] = await this.userRepository.find({
        where: { name: Like(`%${name}%`) },
      });

      const usersWithoutPassword: Omit<User, 'password'>[] = usersList.map(
        (user: User) => {
          const { password, ...result } = user;
          return result;
        },
      );

      return usersWithoutPassword;
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
