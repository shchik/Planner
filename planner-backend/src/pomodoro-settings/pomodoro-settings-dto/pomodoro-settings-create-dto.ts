import { IsNumber, IsOptional } from "class-validator";

export class PomodoroCreateDto {
	@IsNumber()
	userId: number;

	@IsOptional()
	@IsNumber()
	workInterval: number;

	@IsOptional()
	@IsNumber()
	breakInterval: number;

	@IsOptional()
	@IsNumber()
	intervalsCount: number;
}
