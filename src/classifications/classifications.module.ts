import { Module } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';
import { ClassificationsController } from './classifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classifications } from './classifications.entity';
import { Users } from 'src/auth/entities/users.entity';
import { Problems } from 'src/problems/problems.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classifications, Users, Problems])],
  controllers: [ClassificationsController],
  providers: [ClassificationsService],
})
export class ClassificationsModule {}
