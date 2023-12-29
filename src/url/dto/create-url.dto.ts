import { ApiProperty } from "@nestjs/swagger";



export class CreateUrlDto {
	@ApiProperty()
	original_url: string
}
