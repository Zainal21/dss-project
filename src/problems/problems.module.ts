import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problems } from './problems.entity';
import { Users } from 'src/auth/entities/users.entity';
import { Categories } from 'src/categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problems, Users, Categories])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
