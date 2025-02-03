import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePomodoroTimerDto } from "./pomodoro-timer-dto/pomodoro-timer-create-dto";
import { UpdatePomodoroTimerDto } from "./pomodoro-timer-dto/pomodoro-timer-update-dto";

@Injectable()
export class PomodoroTimerService {
	constructor(private readonly prisma: PrismaService) {}

	async createTimer(createPomodoroTimerDto: CreatePomodoroTimerDto) {
		return this.prisma.pomodoroTimer.create({
			data: {
				timeLeft: createPomodoroTimerDto.timeLeft,
				cyclesCount: createPomodoroTimerDto.cyclesCount,
				userId: createPomodoroTimerDto.userId,
			},
		});
	}

	async getTimer(userId: number) {
		return this.prisma.pomodoroTimer.findUnique({
			where: {
				userId: userId,
			},
		});
	}

	async updateTimer(updatePomodoroTimerDto: UpdatePomodoroTimerDto) {
		const { userId, ...data } = updatePomodoroTimerDto;
		return this.prisma.pomodoroTimer.update({
			where: {
				userId: userId,
			},
			data: data,
		});
	}
}
