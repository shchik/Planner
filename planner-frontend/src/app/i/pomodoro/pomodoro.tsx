'use client'

import { useTimer } from '@/hooks/pomodoro/useTimer'
import { useUpdateTimer } from '@/hooks/pomodoro/useUpdateTimer'
import { useProfile } from '@/hooks/useProfile'
import { PomodoroSettingsType } from '@/types/pomodoro-settings.types'
import { ArrowLeft, ArrowRight, Pause, Play, RefreshCcw } from 'lucide-react'
import React from 'react'
import s from './pomodoro.module.scss'

export type PomodoroTimerType = {
	timeLeft: number
	cyclesCount: number
}

const PomodoroView: React.FC = () => {
	const { data } = useProfile()
	const [isRunning, setIsRunning] = React.useState(false)

	const [pomodoroSettings, setPomodoroSettings] =
		React.useState<PomodoroSettingsType>({
			workInterval: 0,
			breakInterval: 0,
			intervalsCount: 0,
		})

	const { pomodoroTimer } = useTimer()
	const { updateTimer } = useUpdateTimer()

	React.useEffect(() => {
		setPomodoroSettings({
			workInterval: data?.pomodoroSettings.workInterval!,
			breakInterval: data?.pomodoroSettings.breakInterval!,
			intervalsCount: data?.pomodoroSettings.intervalsCount!,
		})
	}, [data])

	React.useEffect(() => {
		if (!isRunning || !pomodoroTimer) return
		let timer: NodeJS.Timeout = setInterval(() => {
			if (pomodoroTimer.timeLeft <= 0) {
				setIsRunning(false)
				clearInterval(timer)
				const newState = {
					timeLeft: pomodoroSettings.workInterval! * 60,
					cyclesCount: pomodoroTimer.cyclesCount + 1,
				}
				updateTimer(newState)
			} else {
				const updatedState = {
					...pomodoroTimer,
					timeLeft: pomodoroTimer.timeLeft - 1,
				}
				updateTimer(updatedState)
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [isRunning, pomodoroTimer, pomodoroSettings.workInterval])

	const updateCycles = (isAdd: boolean) => {
		if (!pomodoroTimer) return
		const newCycles = isAdd
			? pomodoroTimer.cyclesCount + 1
			: pomodoroTimer.cyclesCount - 1

		if (newCycles < 0 || newCycles > pomodoroSettings.intervalsCount) return

		const newState = {
			...pomodoroTimer,
			cyclesCount: newCycles,
		}

		updateTimer(newState)
	}

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const secs = Math.floor(seconds % 60)
		return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
			2,
			'0'
		)}`
	}

	const handleRefreshIcon = () => {
		setIsRunning(false)
		const newState = {
			cyclesCount: 0,
			timeLeft: pomodoroSettings.workInterval * 60,
		}
		updateTimer(newState)
	}

	return (
		<div className={s.pomodoro}>
			<RefreshCcw
				className="absolute right-4 cursor-pointer"
				onClick={handleRefreshIcon}
			/>
			<div className={s.pomodoro__timer}>
				<h1>{formatTime(pomodoroTimer?.timeLeft!)}</h1>
			</div>

			<div className={s.pomodoro__actions}>
				{isRunning ? (
					<Pause onClick={() => setIsRunning(false)} />
				) : (
					<Play onClick={() => setIsRunning(true)} />
				)}
			</div>

			<ul className={s.pomodoro__progress}>
				<ArrowLeft onClick={() => updateCycles(false)} />
				{Array.from({ length: pomodoroSettings.intervalsCount }).map(
					(_, index) => (
						<li
							key={index}
							className={
								index < pomodoroTimer?.cyclesCount!
									? s.pomodoro__progress_completed
									: index === pomodoroTimer?.cyclesCount &&
									  isRunning
									? s.pomodoro__progress_completing
									: s.pomodoro__progress_item
							}
						></li>
					)
				)}
				<ArrowRight onClick={() => updateCycles(true)} />
			</ul>
		</div>
	)
}

export default PomodoroView
