import { ProblemDto } from './problems.dto';
import {
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
import { ProblemsService } from './problems.service';
import { AuthGuard } from 'src/shared/security/auth.guard';

@UseGuards(AuthGuard)
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  getProblemByUserId(@Param('userId') userId) {
    return this.problemsService.getProblemByUserId(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createProblem(ProblemDto: ProblemDto) {
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDetailProblem(@Param('id') id) {
    return this.problemsService.getProblemById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteProblem(@Param('id') id) {
    return this.problemsService.deleteProblemById(id);
  }
}
