import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { CreateTaskDto } from "./task-dto/create-task.dto";
import { DeleteTaskDto } from "./task-dto/delete-task.dto";
import { UpdateTaskDto } from "./task-dto/update-task.dto";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Auth()
	@Post("create")
	@HttpCode(200)
	async createTask(
		@Body() createTaskDto: CreateTaskDto,
		@CurrentUser("id") user_id: number
	) {
		createTaskDto.userId = user_id;
		const { createdAt, updatedAt, userId, ...task } =
			await this.taskService.createTask(createTaskDto);
		return task;
	}

	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post("delete")
	async deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
		this.taskService.deleteTask(deleteTaskDto.taskId);
	}

	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Patch("update")
	async updateTask(@Body() updateTaskDto: UpdateTaskDto) {
		const { createdAt, updatedAt, userId, ...task } =
			await this.taskService.updateTask(updateTaskDto);
		return task;
	}

	@Auth()
	@HttpCode(200)
	@Get("all-tasks")
	async getAllTasks(@CurrentUser("id") userId: number) {
		return this.taskService.getAllTasks(userId);
	}
}
