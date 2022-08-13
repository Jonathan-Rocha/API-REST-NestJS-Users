import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userName')
  public getUserName(@Param('userName') userName: string): User {
    const userFound = this.userService.getUserName(userName);

    if (!userFound) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }
    return userFound;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const userCreated = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        // eslint-disable-next-line prettier/prettier
        'location': `/users/${userCreated.userName}`,
      })
      .withBody(userCreated)
      .build();
  }
}
