import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsRepository.save(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    this.catsRepository.delete(id);
  }
}
