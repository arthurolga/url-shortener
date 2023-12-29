import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [DatabaseModule, HttpModule],
	controllers: [UrlController],
	providers: [UrlService]
})
export class UrlModule { }
