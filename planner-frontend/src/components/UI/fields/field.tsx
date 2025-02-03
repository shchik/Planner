"use client";

import { forwardRef, SetStateAction } from "react";
import s from "./field.module.scss";

type FieldProps = {
	label: string;
	type: string;
	id: string;
	placeholder: string;
	error?: string;
	setConfirmPassword?: React.Dispatch<SetStateAction<string>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef<HTMLInputElement, FieldProps>(
	(
		{ label, type, id, placeholder, error, setConfirmPassword, ...rest },
		ref
	) => {
		return (
			<div className={s.field}>
				<p className="text-black">{label}:</p>
				<input
					type={type}
					id={id}
					placeholder={placeholder}
					required
					ref={ref}
					onChange={
						id === "confirmPassword"
							? (e: React.ChangeEvent<HTMLInputElement>) => {
									setConfirmPassword!(e.target.value);
							  }
							: rest.onChange
					}
					{...rest}
				/>
			</div>
		);
	}
);

Field.displayName = "Field";

export default Field;
