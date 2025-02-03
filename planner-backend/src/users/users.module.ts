import { Module } from "@nestjs/common";
import { PomodoroService } from "src/pomodoro-settings/pomodoro-settings.service";
import { PrismaService } from "src/prisma.service";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	controllers: [UserController],
	providers: [UsersService, PrismaService, PomodoroService],
	exports: [UsersService],
})
export class UsersModule {}
