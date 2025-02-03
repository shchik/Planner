import { IsNumber } from "class-validator";

export class DeleteTaskDto {
	@IsNumber()
	taskId: number;
}