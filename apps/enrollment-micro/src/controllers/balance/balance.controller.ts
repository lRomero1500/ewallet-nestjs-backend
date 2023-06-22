import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AccountUseCases } from '../../use-cases/account/account.use-cases';
import { AccountDTO } from '../../core/dtos';

@Controller('balance')
export class BalanceController {
  constructor(private readonly accountUseCases: AccountUseCases) {}
  @EventPattern('topic.balance_update')
  async handleBalanceUpdate(data: { accountDTO: AccountDTO }) {
    console.log('datos: ', data.accountDTO);
    await this.accountUseCases.updateBalanceAccount(data.accountDTO);
  }

  // @Post('updateBalance')
  // async updateBalance(
  //   @Body() accountDTO: AccountDTO,
  // ): Promise<ICommonResponse> {
  //   return await this.accountUseCases.updateBalanceAccount(accountDTO);
  // }
}
