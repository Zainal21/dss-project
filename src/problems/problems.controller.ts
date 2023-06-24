// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProblemDto } from './problems.dto';
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
import { ProblemsService } from './problems.service';
import { AuthGuard } from 'src/shared/security/auth.guard';

@UseGuards(AuthGuard)
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  getProblemByUserId(
    @Param('userId') userId,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.problemsService.getProblemByUserId(userId, page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDetailProblem(@Param('id') id) {
    return this.problemsService.getProblemById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createProblem(@Body() ProblemDto: ProblemDto) {
    return this.problemsService.createProblem(ProblemDto);
  }

  @Patch(':id/user/:userId')
  @HttpCode(HttpStatus.OK)
  updateProblem(
    ProblemDto: ProblemDto,
    @Param('id') id,
    @Param('userId') userId,
  ) {
    return this.problemsService.updateProblem(ProblemDto, id, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteProblem(@Param('id') id) {
    return this.problemsService.deleteProblemById(id);
  }
}
