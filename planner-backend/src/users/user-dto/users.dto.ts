import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUsersDto {
	@IsEmail()
	email: string;

	@IsString()
	name: string;

	@IsString()
	@MinLength(6, {
		message: "Password must be at least 6 characters length!!!"
	})
	password: string;
}

