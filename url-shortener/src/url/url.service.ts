import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DatabaseService } from 'src/database/database.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class UrlService {
	constructor(private database: DatabaseService, private readonly httpService: HttpService) { }


	async create(createUrlDto: CreateUrlDto) {

		const { original_url } = createUrlDto


		let url_to_create = original_url;
		if (!(url_to_create.slice(0, 8) === 'https://' || url_to_create.slice(0, 7) === 'http://')) {
			url_to_create = `https://${url_to_create}`
		}




		const created_url = await this.database.url.create({
			data: {
				original_url: url_to_create
			}
		})

		if (created_url && created_url.id) {
			this.getTitleForUrl(created_url.id)
		}

		return created_url;


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

	findFrequent() {
		return this.database.url.findMany({
			orderBy: {
				accesses: 'desc'
			}
		})
	}

	async getTitleForUrl(id: number) {
		const url = await this.database.url.findFirst({
			where: {
				id
			}
		})



		const { data: pageText } = await firstValueFrom(this.httpService.get(url.original_url))


		const re = new RegExp('<title>(.*)</title>')
		const title = (pageText as string).match(re)[1];

		console.log("Title:", title)


		const edited_url = await this.database.url.update({
			where: {
				id
			},
			data: {
				title
			}
		})







	}




	update(id: number, updateUrlDto: UpdateUrlDto) {
		return `This action updates a #${id} url`;
	}

	remove(id: number) {
		return `This action removes a #${id} url`;
	}
}
