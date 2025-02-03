import { Body, Controller, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { PomodoroCreateDto } from "./pomodoro-settings-dto/pomodoro-settings-create-dto";
import { PomodoroUpdateDto } from "./pomodoro-settings-dto/pomodoro-settings-update-dto";
import { PomodoroService } from "./pomodoro-settings.service";

@Controller("pomodoro")
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Auth()
	@HttpCode(200)
	@Post("create")
	async createPomodoro(
		@Body() createPomodoroDto: PomodoroCreateDto,
		@CurrentUser("id") user_id: number
	) {
		createPomodoroDto.userId = user_id;
		const { createdAt, updatedAt, userId, ...pomodoroSettings } =
			await this.pomodoroService.createPomodoro(createPomodoroDto);
		return pomodoroSettings;
	}

	@Auth()
	@HttpCode(200)
	@Patch("update")
	async updatePomodoro(
		@Body() updatePomodoroDto: PomodoroUpdateDto,
		@CurrentUser("id") user_id: number
	) {
		updatePomodoroDto.userId = user_id;
		const { createdAt, updatedAt, userId, ...pomodoroSettings } =
			await this.pomodoroService.updatePomodoro(updatePomodoroDto);
		return pomodoroSettings;
	}

	@Auth()
	@HttpCode(200)
	@Get("get")
	async getPomodoro(@CurrentUser("id") userId: number) {
		return this.pomodoroService.getPomodoro(userId);
	}
}
