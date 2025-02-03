import { IsNumber, IsOptional } from "class-validator";

export class UpdatePomodoroTimerDto {
	@IsNumber()
	userId: number;

	@IsNumber()
	@IsOptional()
	leftTime: number;

	@IsNumber()
	@IsOptional()
	cyclesCount: number;
}
