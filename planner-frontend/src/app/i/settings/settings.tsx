"use client";

import GlobalLoader from "@/components/layouts/dashboard-layout/header/global-loader";
import { Button } from "@/components/UI/buttons/button";
import { useProfile } from "@/hooks/useProfile";
import { useUpdateSettings } from "@/hooks/useUpdateSettings";
import { PomodoroTimerService } from "@/services/pomodoro-timer-service";
import {
	IPomodoroSettingsUpdateData,
	PomodoroSettingsType,
} from "@/types/pomodoro-settings.types";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./settings.module.scss";

const SettingsView: React.FC = () => {
	const { data } = useProfile();
	const pomodoroTimerService = new PomodoroTimerService();
	const [pomodoroSettings, setPomodoroSettings] =
		React.useState<PomodoroSettingsType | null>();

	React.useEffect(() => {
		if (data?.pomodoroSettings) {
			setPomodoroSettings(prev => ({
				workInterval: data.pomodoroSettings.workInterval,
				breakInterval: data.pomodoroSettings.breakInterval,
				intervalsCount: data.pomodoroSettings.intervalsCount,
			}));
		}
	}, [data]);

	const { register, handleSubmit, reset } =
		useForm<IPomodoroSettingsUpdateData>({
			mode: "onChange",
			defaultValues: pomodoroSettings!,
		});

	React.useEffect(() => {
		if (pomodoroSettings) {
			reset(pomodoroSettings);
		}
	}, [pomodoroSettings, reset]);

	const { mutate, isLoading } = useUpdateSettings();

	const onSubmit: SubmitHandler<IPomodoroSettingsUpdateData> = data => {
		mutate(data);
		pomodoroTimerService.updatePomodoroTimer({
			timeLeft: data.workInterval! * 60,
			cyclesCount: 0,
		});
	};

	return (
		<>
			<GlobalLoader />

			{!isLoading ? (
				<form className={s.settings} onSubmit={handleSubmit(onSubmit)}>
					<div className={s.settings__field}>
						<label>Work interval</label>
						<input
							type="number"
							min={1}
							max={59}
							defaultValue={pomodoroSettings?.workInterval}
							{...register("workInterval", {
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className={s.settings__field}>
						<label>Break interval</label>
						<input
							defaultValue={pomodoroSettings?.breakInterval}
							type="number"
							min={1}
							max={59}
							{...register("breakInterval", {
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className={s.settings__field}>
						<label>Intervals count</label>
						<input
							defaultValue={pomodoroSettings?.intervalsCount}
							type="number"
							min={1}
							max={12}
							{...register("intervalsCount", {
								valueAsNumber: true,
							})}
						/>
					</div>
					<Button type="submit" className={s.settings__submit_button}>
						Save
					</Button>
				</form>
			) : (
				""
			)}
		</>
	);
};

export default SettingsView;
