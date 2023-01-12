import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { Public } from '@api/shared/decorators/public.decorator';
import { mapToResponseAsync } from '@api/shared/mapToResponse';
import { mapper } from './mapper/token-response.mapper';
import { TokenResponseDto } from './dto/token-response.dto';

@Public()
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post()
  async createToken(
    @Body() createTokenDto: CreateTokenDto,
  ): Promise<TokenResponseDto> {
    return mapToResponseAsync(
      this.tokenService.create(
        createTokenDto.name,
        createTokenDto.symbol,
        createTokenDto.address,
        createTokenDto.chain,
        createTokenDto.updateContinuously,
      ),
      mapper,
    );
  }
}
