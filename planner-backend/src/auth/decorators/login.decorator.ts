import { UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";

export const Login = () => UseGuards(LocalAuthGuard);