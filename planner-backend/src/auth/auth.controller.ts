import {
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUsersDto } from "src/users/user-dto/users.dto";
import { AuthUsersDto } from "./auth-dto/auth.dto";
import { AuthService } from "./auth.service";
import { Login } from "./decorators/login.decorator";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Login()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(
		@Body() authUsersDto: AuthUsersDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { tokens, user } = await this.authService.login(authUsersDto);

		this.authService.addRefreshTokenToResponse(res, tokens.refresh_token);
		const { access_token } = tokens;
		return {
			user,
			access_token,
		};
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("register")
	async create(
		@Body() createUsersDto: CreateUsersDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { tokens, user } =
			await this.authService.registerUser(createUsersDto);
		this.authService.addRefreshTokenToResponse(res, tokens.refresh_token);
		const access_token: string = tokens.access_token;
		return {
			access_token,
			user,
		};
	}

	@Post("logout")
	@HttpCode(200)
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenToResponse(res);
		return true;
	}

	@Post("login/access-token")
	@HttpCode(200)
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenToResponse(res);
			throw new UnauthorizedException("Refresh token not passed");
		}

		const { tokens, user } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		);

		this.authService.addRefreshTokenToResponse(res, tokens.refresh_token);
		const { access_token } = tokens;

		return {
			user,
			access_token,
		};
	}
}
