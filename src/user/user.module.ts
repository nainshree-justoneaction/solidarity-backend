import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';

import { PrismaModule } from '../prisma.module.js';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
