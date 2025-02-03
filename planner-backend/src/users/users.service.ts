import { Injectable } from "@nestjs/common";
import { hash } from "argon2";
import { PrismaService } from "src/prisma.service";
import { CreateUsersDto } from "./user-dto/users.dto";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id: id,
			},
		});
	}
	2;
	async createUser(createUsersDto: CreateUsersDto) {
		const user = {
			email: createUsersDto.email,
			name: createUsersDto.name,
			password: await hash(createUsersDto.password),
		};

		return this.prisma.user.create({
			data: user,
		});
	}

	async getByEmail(email: string) {
		return this.prisma.user.findFirst({ where: { email: email } });
	}
}
