import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/shared/utils/api-response.interface';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  /**
   * [findAll]
   *
   * @return  {Promise<ApiResponse>}[return]
   */
  async findAll(): Promise<ApiResponse> {
    const categories = await this.categoryRepository.find();
    return {
      statusCode: 200,
      message: 'Category data get successfully',
      data: categories,
    };
  }

  /**
   * [createCategory]
   *
   * @param   {CategoryDto<ApiResponse>}  categoryDto  [categoryDto]
   *
   * @return  {Promise<ApiResponse>}                   [return]
   */
  async createCategory(categoryDto: CategoryDto): Promise<ApiResponse> {
    try {
      const category = await this.categoryRepository.save(categoryDto);
      return {
        statusCode: 201,
        message: 'Catagory created successfully',
        data: category,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [getCategoryByid]
   *
   * @param   {string<ApiResponse>}   id  [id]
   *
   * @return  {Promise<ApiResponse>}      [return]
   */
  async getCategoryByid(id: string): Promise<ApiResponse> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) throw new NotFoundException('Category not found');
      return {
        statusCode: 200,
        message: 'Category data get successfully',
        data: category,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [updateCategory]
   *
   * @return  {ApiResponse}
   */
  async updateCategory(
    id: string,
    CategoryDto: CategoryDto,
  ): Promise<ApiResponse> {
    try {
      const category = await this.categoryRepository.save({
        id: id,
        ...CategoryDto,
      });
      return {
        statusCode: 200,
        message: 'Category udpated get successfully',
        data: category,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * [deleteCategory]
   *
   * @param   {string<ApiResponse>}   id  [id]
   *
   * @return  {Promise<ApiResponse>}      [return]
   */
  async deleteCategory(id: string): Promise<ApiResponse> {
    try {
      const category = await this.categoryRepository.delete({ id });
      return {
        statusCode: 200,
        message: 'Category deleted get successfully',
        data: category,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
