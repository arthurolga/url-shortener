import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UrlService {
	constructor(private database: DatabaseService) { }


	create(createUrlDto: CreateUrlDto) {

		const { original_url } = createUrlDto


		if (original_url.slice(0, 8) === 'https://' || original_url.slice(0, 7) === 'http://') {
			return this.database.url.create({
				data: {
					original_url
				}
			})
		} else {
			throw new BadRequestException('URLs should start with HTTPS://')
		}

	}

	findAll() {
		return this.database.url.findMany()
	}

	findOne(id: number) {
		return this.database.url.findFirst({
			where: {
				id
			}
		})
	}

	async access(id: number) {
		const url = await this.database.url.findFirst({
			where: {
				id
			}
		})

		if (url) {
			await this.database.url.update({
				where: {
					id: url.id,
				},
				data: {
					...url,
					accesses: url.accesses + 1,
				},
			})
		}

		return url
	}


	update(id: number, updateUrlDto: UpdateUrlDto) {
		return `This action updates a #${id} url`;
	}

	remove(id: number) {
		return `This action removes a #${id} url`;
	}
}
