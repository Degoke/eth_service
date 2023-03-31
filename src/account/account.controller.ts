import { Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create() {
    return this.accountService.create();
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }
}
