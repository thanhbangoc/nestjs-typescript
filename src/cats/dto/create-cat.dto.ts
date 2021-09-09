import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({
    description: 'Name of the cat',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Age of the cat',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
