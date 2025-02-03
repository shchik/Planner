import { Priority, TaskDate } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
	@IsString()
	name: string;

	@IsNumber()
	userId: number;

	@IsOptional()
	@IsEnum(Priority)
	priority?: Priority;

	@IsEnum(TaskDate)
	taskDate: TaskDate;
}
