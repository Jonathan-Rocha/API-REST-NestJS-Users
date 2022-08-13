import { Module } from '@nestjs/common';
import { IsUserAlreadyExistConstraint } from './is-user-name-already-exist.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, IsUserAlreadyExistConstraint],
})
export class UserModule {}
