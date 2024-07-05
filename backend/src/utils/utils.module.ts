import { Module } from '@nestjs/common';
import AmocrmService from './amocrm.service';
import AmocrmRequestsService from './amocrmRequests.service';

@Module({
  providers: [AmocrmService, AmocrmRequestsService],
  exports: [AmocrmService],
})
export class UtilsModule {}
