import { ProblemDto } from './problems.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problems } from './problems.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/shared/utils/api-response.interface';
import { Users } from 'src/auth/entities/users.entity';
import { Categories } from 'src/categories/categories.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problems) private problemRepository: Repository<Problems>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  /**
   * [getProblemByUserId]
   *
   * @param   {string<ApiResponse>}   userId  [userId]
   *
   * @return  {Promise<ApiResponse>}          [return ]
   */
  async getProblemByUserId(userId: string | any): Promise<ApiResponse> {
    const problems = await this.problemRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (problems.length < 1) throw new NotFoundException('Problem not found');

    return {
      statusCode: 201,
      message: 'Problem by user get successfully',
      data: problems,
    };
  }

  /**
   * [getProblemById ]
   *
   * @param   {string<ApiResponse>}   id  [id ]
   *
   * @return  {Promise<ApiResponse>}      [return ]
   */
  async getProblemById(id: string): Promise<ApiResponse> {
    const problem = await this.problemRepository.findOneBy({
      id: id,
    });

    if (!problem) throw new NotFoundException('problem not found');

    return {
      statusCode: 200,
      message: 'Problem detail get successfully',
      data: problem,
    };
  }

  /**
   * [createProblem ]
   *
   * @param   {ProblemDto<ApiResponse>}  ProblemDto  [ProblemDto ]
   *
   * @return  {Promise<ApiResponse>}                 [return ]
   */
  async createProblem(ProblemDto: ProblemDto): Promise<ApiResponse> {
    // check user is exist
    const user = await this.userRepository.findOneBy({
      id: ProblemDto.userId,
    });

    if (!user) throw new NotFoundException('User not found');

    // check category is exist
    const categories = await this.categoryRepository.findOneBy({
      id: ProblemDto.categoryId,
    });

    if (!categories) throw new NotFoundException('Categories not found');

    const { problemName, userId, categoryId } = ProblemDto;
    const problem = await this.problemRepository.save({
      problemName,
      user: { id: userId },
      category: { id: categoryId },
    });
    return {
      statusCode: 200,
      message: 'Problem created successfully',
      data: problem,
    };
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
    const user = await this.userRepository.findOneBy({
      id: ProblemDto.userId,
    });

    if (!user) throw new NotFoundException('User not found');

    // check category is exist
    const categories = await this.categoryRepository.findOneBy({
      id: ProblemDto.categoryId,
    });

    if (!categories) throw new NotFoundException('Categories not found');

    const problem = await this.problemRepository.save({
      id: id,
      userId: userId,
      category: { id: ProblemDto.categoryId },
      ...ProblemDto,
    });
    return {
      statusCode: 200,
      message: 'Problem updated successfully',
      data: problem,
    };
  }

  /**
   * [deleteProblemById ]
   *
   * @param   {string<ApiResponse>}   id  [id ]
   *
   * @return  {Promise<ApiResponse>}      [return ]
   */
  async deleteProblemById(id: string): Promise<ApiResponse> {
    const problem = await this.problemRepository.delete({
      id: id,
    });

    if (!problem) throw new NotFoundException('Problem Not Found');

    return {
      statusCode: 200,
      message: 'Problem delete successfully',
      data: problem,
    };
  }
}
