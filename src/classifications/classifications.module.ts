import { Module } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';
import { ClassificationsController } from './classifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classifications } from './classifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classifications])],
  controllers: [ClassificationsController],
  providers: [ClassificationsService],
})
export class ClassificationsModule {}
