import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @Post()
  async create(@Body() createAuthDto: CreateUserDto) {
    return await this.userService.create(createAuthDto);
  }

  @ApiOperation({ summary: 'Get Detail User' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update User' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return await this.userService.update(+id, updateAuthDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All User' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
