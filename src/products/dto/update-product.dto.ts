import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  price?: number;
}
