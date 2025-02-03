import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "email" });
	}

	async validate(
		email: string,
		password: string
	): Promise<{ email: string; id: number }> {
		const user = await this.authService.validateUser({
			email: email,
			password: password,
		});
		if (!user) {
			throw new UnauthorizedException("You are not authorized");
		}
		return user;
	}
}
