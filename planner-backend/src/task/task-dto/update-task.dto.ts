import { Priority, TaskDate } from "@prisma/client";
import {
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";

export class UpdateTaskDto {
	@IsNumber()
	id: number;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEnum(Priority)
	priority?: Priority;

	@IsOptional()
	@IsEnum(TaskDate)
	taskDate?: TaskDate;

	@IsOptional()
	@IsBoolean()
	isCompleted: boolean;
}
