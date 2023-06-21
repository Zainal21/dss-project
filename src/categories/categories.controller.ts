import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/shared/security/auth.guard';
import { CategoryDto } from './categories.dto';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.categoriesService.getCategoryById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() categoryDto: CategoryDto) {
    return await this.categoriesService.createCategory(categoryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Body() categoryDto: CategoryDto, @Param('id') id) {
    return await this.categoriesService.updateCategory(id, categoryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroy(@Param() id: string) {
    return await this.categoriesService.deleteCategory(id);
  }
}
