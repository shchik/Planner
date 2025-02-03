import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { PomodoroModule } from "./pomodoro-settings/pomodoro-settings.module";
import { TaskModule } from "./task/task.module";
import { UsersModule } from "./users/users.module";
import { PomodoroTimerModule } from './pomodoro-timer/pomodoro-timer.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		UsersModule,
		TaskModule,
		PomodoroModule,
		PomodoroTimerModule,
	],
	controllers: [AppController, AuthController],
})
export class AppModule {}
