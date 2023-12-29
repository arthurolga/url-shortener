import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
	constructor(private readonly urlService: UrlService) { }

	@Post()
	create(@Body() createUrlDto: CreateUrlDto) {
		return this.urlService.create(createUrlDto);
	}

	@Get()
	findAll() {
		return this.urlService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.urlService.findOne(+id);
	}

	@Get('access/:id')
	async access(@Res() res, @Param('id') id: string) {
		const accessUrl = await this.urlService.access(+id)
		if (accessUrl && accessUrl.original_url) {
			res.status(302).redirect(accessUrl.original_url)
		}
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
		return this.urlService.update(+id, updateUrlDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.urlService.remove(+id);
	}
}
