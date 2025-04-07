import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  CreateUserSchema,
  CreateUserSwaggerDto,
} from './dto/create-user.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  UpdateUserDto,
  UpdateUserSchema,
  UpdateUserSwaggerDto,
} from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @ApiBody({ type: CreateUserSwaggerDto })
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch users', description: 'Fetches all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user', description: 'Get an user details by id' })
  findOneByID(@Param('id') id: string) {
    return this.userService.findOneByID(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserSwaggerDto })
  @ApiOperation({ summary: 'Update User', description: 'Updates the data of a user by its id' })
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user', description: 'Deletes an user by id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
