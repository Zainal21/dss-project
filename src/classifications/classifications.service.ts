import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classifications } from './classifications.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassificationsService {
  constructor(
    @InjectRepository(Classifications)
    private readonly classificationRepository: Repository<Classifications>,
  ) {}
}
