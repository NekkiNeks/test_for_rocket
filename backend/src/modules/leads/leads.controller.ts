import { Controller, Get, Query } from '@nestjs/common';
import AmocrmService from 'src/utils/amocrm.service';

@Controller('leads')
export class LeadsController {
  constructor(private amocrmService: AmocrmService) {}

  @Get()
  getAllLeads(@Query('query') query: string) {
    return this.amocrmService.getLeads(query);
  }
}
