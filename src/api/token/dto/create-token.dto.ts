import { ChainEnum } from '@domain/index';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  address: string;

  @IsNotEmpty()
  chain: ChainEnum;

  @IsOptional()
  @IsString()
  updateContinuously?: boolean;
}
