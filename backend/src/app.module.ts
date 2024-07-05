import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './modules/leads/leads.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [LeadsModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
