import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cat } from './cats.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiResponse({
    status: 201,
    description: 'The cat has been successfully recorded.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
