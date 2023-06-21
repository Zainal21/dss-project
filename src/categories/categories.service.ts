import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<ApiResponse> {
    const categories = await this.categoryRepository.find();
    return {
      statusCode: 200,
      message: 'Category data get successfully',
      data: categories,
    };
  }

  async createCategory(categoryDto: CategoryDto): Promise<ApiResponse> {
    const category = await this.categoryRepository.save(categoryDto);
    return {
      statusCode: 201,
      message: 'Catagory created successfully',
      data: category,
    };
  }

  async getCategoryByid(id: string): Promise<ApiResponse> {
    const category = await this.categoryRepository.findOneBy({ id });
    return {
      statusCode: 200,
      message: 'Category data get successfully',
      data: category,
    };
  }

  async updateCategory(
    id: string,
    CategoryDto: CategoryDto,
  ): Promise<ApiResponse> {
    const category = await this.categoryRepository.save({
      id: id,
      ...CategoryDto,
    });
    return {
      statusCode: 200,
      message: 'Category udpated get successfully',
      data: category,
    };
  }

  async deleteCategory(id: string): Promise<ApiResponse> {
    const category = await this.categoryRepository.delete({ id });
    return {
      statusCode: 200,
      message: 'Category deleted get successfully',
      data: category,
    };
  }
}
