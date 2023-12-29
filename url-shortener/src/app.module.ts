import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UrlModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
