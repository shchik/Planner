import { Controller, Get, HttpCode } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { PomodoroService } from "src/pomodoro-settings/pomodoro-settings.service";
import { UsersService } from "./users.service";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UsersService,
		private readonly pomodoroService: PomodoroService
	) {}

	@Auth()
	@HttpCode(200)
	@Get("profile")
	async getProfile(@CurrentUser("id") userId: number) {
		const { createdAt, updatedAt, id, password, ...user } =
			await this.userService.getById(userId);
		const pomodoroSettings = await this.pomodoroService.getPomodoro(userId);
		return { user, pomodoroSettings };
	}
}
