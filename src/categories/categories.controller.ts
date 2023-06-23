import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/shared/security/auth.guard';
import { CategoryDto } from './categories.dto';

@UseGuards(AuthGuard)
@Controller('categories')
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id, @Res() res: Response) {
    const category = await this.categoriesService.getCategoryById(id);
    if (!category) throw new NotFoundException('Catgeory not found');

    res.status(HttpStatus.OK).json({
      statusCode: category.statusCode,
      message: category.message,
      data: category.data,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() categoryDto: CategoryDto, @Res() res: Response) {
    const category = await this.categoriesService.createCategory(categoryDto);

    if (!category) throw new BadRequestException('Invalid Parameter');

    res.status(HttpStatus.OK).json({
      statusCode: category.statusCode,
      message: category.message,
      data: category.data,
    });
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
