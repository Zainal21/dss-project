import { ClassificationDto } from './classifications.dto';
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassificationsService } from './classifications.service';
import { AuthGuard } from 'src/shared/security/auth.guard';

@UseGuards(AuthGuard)
@Controller('classifications')
export class ClassificationsController {
  constructor(
    private readonly classificationsService: ClassificationsService,
  ) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async findByUserId(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.classificationsService.findByUserId(userId, page, limit);
  }

  @Get('/problem/:problemId')
  @HttpCode(HttpStatus.OK)
  async findByProblemId(@Param('problemId') problemId: string) {
    return this.classificationsService.findByProblemId(problemId);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async createClassification(@Body() createClassification: ClassificationDto) {
    return this.classificationsService.createClasification(
      createClassification,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProblem(
    @Param('id') id: string,
    ClassificationDto: ClassificationDto,
  ) {
    return this.classificationsService.updateClassification(
      id,
      ClassificationDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteClassification(@Param('id') id) {
    console.log(id);
    return this.classificationsService.deleteClassification(id);
  }
}
