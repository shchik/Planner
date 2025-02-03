import { IsNumber } from "class-validator";

export class CreatePomodoroTimerDto {
	@IsNumber()
	timeLeft: number;

	@IsNumber()
	cyclesCount: number;

	@IsNumber()
	userId: number;
}
