import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problems } from './problems.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/shared/utils/api-response.interface';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problems) private problemRepository: Repository<Problems>,
  ) {}

  async getProblemByUserId(userId: string | any): Promise<ApiResponse> {
    const problems = await this.problemRepository.find({
      where: {
        user: userId,
      },
    });

    return {
      statusCode: 200,
      message: 'Problem by user id get successfully',
      data: problems,
    };
  }
}
