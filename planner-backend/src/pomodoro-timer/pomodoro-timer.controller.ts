import { Body, Controller, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { CreatePomodoroTimerDto } from "./pomodoro-timer-dto/pomodoro-timer-create-dto";
import { UpdatePomodoroTimerDto } from "./pomodoro-timer-dto/pomodoro-timer-update-dto";
import { PomodoroTimerService } from "./pomodoro-timer.service";

@Controller("pomodoro-timer")
export class PomodoroTimerController {
	constructor(private readonly pomodoroTimerService: PomodoroTimerService) {}

	@Auth()
	@Post("create")
	@HttpCode(200)
	async createTimer(
		@Body() createPomodoroTimerDto: CreatePomodoroTimerDto,
		@CurrentUser("id") user_id: number
	) {
		createPomodoroTimerDto.userId = user_id;
		const { createdAt, updatedAt, userId, ...pomodoroTimer } =
			await this.pomodoroTimerService.createTimer(createPomodoroTimerDto);
		return pomodoroTimer;
	}

	@Auth()
	@Get("get")
	@HttpCode(200)
	async getTimer(@CurrentUser("id") user_id: number) {
		const { createdAt, updatedAt, userId, ...pomodoroTimer } =
			await this.pomodoroTimerService.getTimer(user_id);
		return pomodoroTimer;
	}

	@Auth()
	@Patch("update")
	@HttpCode(200)
	async updateTimer(
		@Body() updatePomodoroTimerDto: UpdatePomodoroTimerDto,
		@CurrentUser("id") user_id: number
	) {
		updatePomodoroTimerDto.userId = user_id;
		const { createdAt, updatedAt, userId, ...pomodoroTimer } =
			await this.pomodoroTimerService.updateTimer(updatePomodoroTimerDto);
		return pomodoroTimer;
	}
}
