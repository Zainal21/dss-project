import { ProblemDto } from './problems.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problems } from './problems.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/shared/utils/api-response.interface';
import { Users } from 'src/auth/entities/users.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problems) private problemRepository: Repository<Problems>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  /**
   * [getProblemByUserId]
   *
   * @param   {string<ApiResponse>}   userId  [userId]
   *
   * @return  {Promise<ApiResponse>}          [return ]
   */
  async getProblemByUserId(userId: string | any): Promise<ApiResponse> {
    try {
      const problems = await this.problemRepository.find({
        where: {
          user: userId,
        },
      });

      if (problems.length > 0) {
        return {
          statusCode: 201,
          message: 'Problem by user get successfully',
          data: problems,
        };
      } else {
        throw new NotFoundException('Problem by user not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [getProblemById ]
   *
   * @param   {string<ApiResponse>}   id  [id ]
   *
   * @return  {Promise<ApiResponse>}      [return ]
   */
  async getProblemById(id: string): Promise<ApiResponse> {
    try {
      const problem = await this.problemRepository.findOneBy({
        id: id,
      });

      if (!problem) throw new NotFoundException('problem not found');

      return {
        statusCode: 200,
        message: 'Problem detail get successfully',
        data: problem,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [createProblem ]
   *
   * @param   {ProblemDto<ApiResponse>}  ProblemDto  [ProblemDto ]
   *
   * @return  {Promise<ApiResponse>}                 [return ]
   */
  async createProblem(ProblemDto: ProblemDto): Promise<ApiResponse> {
    try {
      // check user is exist
      const user = await this.userRepository.findOneBy({
        id: ProblemDto.userId,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const problem = this.problemRepository.create(ProblemDto);
      return {
        statusCode: 200,
        message: 'Problem created successfully',
        data: problem,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [updateProblem ]
   *
   * @return  {[type]}  [return ]
   */
  async updateProblem(
    ProblemDto: ProblemDto,
    id: string,
    userId: string,
  ): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findOneBy({
        id: ProblemDto.userId,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const problem = this.problemRepository.create({
        id: id,
        userId: userId,
        ...ProblemDto,
      });
      return {
        statusCode: 200,
        message: 'Problem updated successfully',
        data: problem,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [deleteProblemById ]
   *
   * @param   {string<ApiResponse>}   id  [id ]
   *
   * @return  {Promise<ApiResponse>}      [return ]
   */
  async deleteProblemById(id: string): Promise<ApiResponse> {
    try {
      const problem = await this.problemRepository.delete({
        id: id,
      });

      return {
        statusCode: 200,
        message: 'Problem delete successfully',
        data: problem,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
