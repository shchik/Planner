"use client";

import { Button } from "@/components/UI/buttons/button";
import Field from "@/components/UI/fields/field";
import { AuthService } from "@/services/auth.service";
import { PomodoroSettingsService } from "@/services/pomodoro-settings-service";
import { PomodoroTimerService } from "@/services/pomodoro-timer-service";
import { IAuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import s from "./auth.module.scss";

const AuthForm: React.FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IAuthForm>({
		mode: "onChange",
	});

	const pomodoroTimerService = new PomodoroTimerService();
	const pomodoroSettingsService = new PomodoroSettingsService();

	const [isLogin, setIsLogin] = React.useState(true);
	const password = watch("password");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [isLegitPassword, setIsLegitPassword] = React.useState(true);
	const router = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAuthForm) =>
			AuthService.main(isLogin ? "login" : "register", data),

		onSuccess: async () => {
			toast.success("Successfully entered!");
			reset();
			isLogin ? "" : await createPomodoro();
			router.push("/");
		},
		onError: error => {
			console.error("Auth error:", error);
			toast.error("Authentication failed. Please try again.");
		},
	});

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		if (confirmPassword !== password && isLogin === false) {
			setIsLegitPassword(false);
			return;
		}
		mutate(data);
	};

	const createPomodoro = async () => {
		try {
			const response =
				await pomodoroSettingsService.createPomodoroSettings();

			const response1 = await pomodoroTimerService.createPomodoroTimer({
				timeLeft: response.workInterval,
				cyclesCount: 0,
			});

			if (response && response1) {
				toast.success("Pomodoro settings created successfully!");
			}
		} catch (error) {
			console.error("Error creating Pomodoro settings:", error);
			toast.error("Failed to create Pomodoro settings.");
		}
	};

	return (
		<div className={s.form}>
			<form
				className={s.form__container}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-2xl text-black font-bold  mb-4">
					{isLogin ? "Auth" : "Register"}
				</h1>
				<div className="h-0.5 w-2/5 bg-black"></div>
				<Field
					label="Email"
					type="email"
					id="email"
					placeholder="Enter email"
					{...register("email", {
						required: "Required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "invalid email address",
						},
					})}
					error={errors.email?.message}
				/>

				{!isLogin ? (
					<Field
						label="Username"
						type="text"
						id="name"
						placeholder="Enter username"
						{...register("name", {
							required: "Required",
						})}
					/>
				) : (
					""
				)}

				<Field
					label="Password"
					type="password"
					id="password"
					placeholder="Enter password"
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					})}
					error={errors.password?.message}
				/>

				{!isLogin ? (
					<Field
						label="Confirm password"
						type="password"
						id="confirmPassword"
						placeholder="Enter password once more"
						setConfirmPassword={setConfirmPassword}
					/>
				) : (
					""
				)}

				<div>
					<Button className={s.form__submit_button} type="submit">
						{isLogin ? "Log in" : "Register"}
					</Button>
					{!isLegitPassword ? (
						<div className="text-sm text-red-800">
							Passwords don't match!
						</div>
					) : (
						""
					)}
				</div>

				<div className={s.form__change_auth}>
					<p className="mr-2">
						{isLogin
							? "Hasn't registered yet?"
							: "Already Registered?"}{" "}
					</p>
					<Button type="button" onClick={() => setIsLogin(!isLogin)}>
						{!isLogin ? "Log in" : "Register"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
