import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classifications } from './classifications.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/shared/utils/api-response.interface';
import { ClassificationDto } from './classifications.dto';
import { Users } from 'src/auth/entities/users.entity';
import { Problems } from 'src/problems/problems.entity';

@Injectable()
export class ClassificationsService {
  constructor(
    @InjectRepository(Classifications)
    private readonly classificationRepository: Repository<Classifications>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Problems)
    private readonly problemRepository: Repository<Problems>,
  ) {}

  /**
   * [findByUserId]
   *
   * @param   {string<ApiResponse>}   userId  [userId]
   *
   * @return  {Promise<ApiResponse>}          [return]
   */
  async findByUserId(userId: string): Promise<ApiResponse> {
    const classification = await this.classificationRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['problem', 'problem.category'],
    });

    if (classification.length < 1)
      throw new NotFoundException('Clasification Not Found');
    return {
      statusCode: 200,
      data: classification,
      message: 'classification by user id get successfully',
    };
  }

  /**
   * [findByProblemId]
   *
   * @param   {string<ApiResponse>}   problemId  [problemId]
   *
   * @return  {Promise<ApiResponse>}             [return]
   */
  async findByProblemId(problemId: string): Promise<ApiResponse> {
    const classification = await this.classificationRepository.find({
      where: {
        problem: {
          id: problemId,
        },
      },
      relations: ['problem', 'problem.category'],
    });

    if (classification.length < 1)
      throw new NotFoundException('classification Not Found');
    return {
      statusCode: 200,
      data: classification,
      message: 'classification by user id get successfully',
    };
  }

  /**
   * [createClasification]
   *
   * @param   {ClassificationDto<ApiResponse>}  classificationDto  [classificationDto]
   *
   * @return  {Promise<ApiResponse>}                               [return]
   */
  async createClasification(
    classificationDto: ClassificationDto,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOneBy({
      id: classificationDto.userId,
    });

    if (!user) throw new NotFoundException('User Not Found');

    const problems = await this.problemRepository.findOneBy({
      id: classificationDto.problemId,
    });

    if (!problems) throw new NotFoundException('Problem Not Found');

    const { classificationName, answer, userId, problemId } = classificationDto;
    const classification = await this.classificationRepository.save({
      classificationName,
      answer,
      user: {
        id: userId,
      },
      problem: {
        id: problemId,
      },
    });

    if (!classification)
      throw new BadRequestException('Invalid payload parameter');

    return {
      statusCode: 201,
      message: 'classification data created successfully',
      data: classification,
    };
  }

  /**
   * [updateClassification]
   *
   * @param   {string}                          id                 [id]
   * @param   {ClassificationDto<ApiResponse>}  ClassificationDto  [ClassificationDto]
   *
   * @return  {Promise<ApiResponse>}                               [return]
   */
  async updateClassification(
    id: string,
    ClassificationDto: ClassificationDto,
  ): Promise<ApiResponse> {
    const classification = await this.classificationRepository.save({
      id: id,
      ...ClassificationDto,
    });

    if (!classification)
      throw new BadRequestException('Invalid request parameter');
    return {
      statusCode: 200,
      message: 'Classification updated successfully',
      data: classification,
    };
  }

  /**
   * [deleteClassification]
   *
   * @param   {string<ApiResponse>}   id  [id]
   *
   * @return  {Promise<ApiResponse>}      [return]
   */
  async deleteClassification(id: string): Promise<ApiResponse> {
    const classification = await this.classificationRepository.delete({
      id: id,
    });

    if (classification?.affected < 1)
      throw new NotFoundException('Classification Data not found');

    return {
      statusCode: 200,
      message: 'Classification data deleted successfully',
      data: classification,
    };
  }
}
