import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { Response } from 'express'
import { User } from 'src/types/types'
import { CreateUsersDto } from 'src/users/user-dto/users.dto'
import { UsersService } from 'src/users/users.service'
import { AuthUsersDto } from './auth-dto/auth.dto'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refresh_token'

	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(authUsersDto: AuthUsersDto): Promise<User> {
		const { createdAt, updatedAt, ...user } =
			await this.usersService.getByEmail(authUsersDto.email)
		if (!user) {
			throw new UnauthorizedException('User not found!')
		}

		const isPasswordValid = await argon2.verify(
			user.password,
			authUsersDto.password
		)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password!')
		}

		return user
	}

	async registerUser(createUsersDto: CreateUsersDto) {
		const existingUser = await this.usersService.getByEmail(
			createUsersDto.email
		)
		if (existingUser) {
			throw new Error('User with this email already exists')
		}
		const { password, createdAt, updatedAt, ...user } =
			await this.usersService.createUser(createUsersDto)

		const tokens = this.issueTokens({ email: user.email, id: user.id })

		return {
			user,
			tokens,
		}
	}

	async login(authUsersDto: AuthUsersDto) {
		const { password, ...user } = await this.validateUser(authUsersDto)
		const tokens = this.issueTokens({ email: user.email, id: user.id })
		return { user, tokens }
	}

	issueTokens(payload: { email: string; id: number }) {
		const access_token = this.jwtService.sign(payload, {
			expiresIn: '1h',
		})
		const refresh_token = this.jwtService.sign(payload, {
			expiresIn: '7d',
		})

		return { access_token, refresh_token }
	}

	addRefreshTokenToResponse(res: Response, refresh_token: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refresh_token, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			sameSite: 'none',
		})
	}

	removeRefreshTokenToResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			secure: true,
			sameSite: 'none',
		})
	}

	async getNewTokens(refresh_token: string) {
		const result = await this.jwtService.verifyAsync(refresh_token)

		if (!result) throw new UnauthorizedException('Invalid refresh token!')

		const userData = await this.usersService.getById(result.id)

		if (!userData) throw new UnauthorizedException('user not found!')

		const { password, createdAt, updatedAt, ...user } =
			await this.usersService.getById(result.id)

		const tokens = this.issueTokens({ email: user.email, id: user.id })

		return {
			user,
			tokens,
		}
	}
}
