import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PomodoroCreateDto } from "./pomodoro-settings-dto/pomodoro-settings-create-dto";
import { PomodoroUpdateDto } from "./pomodoro-settings-dto/pomodoro-settings-update-dto";

@Injectable()
export class PomodoroService {
	constructor(private readonly prisma: PrismaService) {}

	async createPomodoro(createPomodoroDto: PomodoroCreateDto) {
		return this.prisma.user_Pomodoro_Settings.create({
			data: {
				userId: createPomodoroDto.userId,
				workInterval: createPomodoroDto.workInterval,
				breakInterval: createPomodoroDto.breakInterval,
				intervalsCount: createPomodoroDto.intervalsCount,
			},
		});
	}

	async updatePomodoro(updatePomodoroDto: PomodoroUpdateDto) {
		const { userId, ...data } = updatePomodoroDto;
		return this.prisma.user_Pomodoro_Settings.update({
			where: { userId: userId },
			data,
		});
	}

	async getPomodoro(user_id: number) {
		const pomodoro = await this.prisma.user_Pomodoro_Settings.findUnique({
			where: { userId: user_id },
		});
		const { createdAt, updatedAt, userId, ...pomodoroSettings } = pomodoro;
		return pomodoroSettings;
	}
}
