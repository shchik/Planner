import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PomodoroController } from "./pomodoro-settings.controller";
import { PomodoroService } from "./pomodoro-settings.service";

@Module({
	controllers: [PomodoroController],
	providers: [PomodoroService, PrismaService],
	exports: [PomodoroService],
})
export class PomodoroModule {}
