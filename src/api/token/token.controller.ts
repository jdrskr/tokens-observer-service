import { Body, Controller, Post } from '@nestjs/common';
import { Token } from '@domain';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post()
  async createToken(@Body() createTokenDto: CreateTokenDto): Promise<Token> {
    return await this.tokenService.create(
      createTokenDto.name,
      createTokenDto.symbol,
      createTokenDto.address,
      createTokenDto.chain,
      createTokenDto.updateContinuously,
    );
  }
}
