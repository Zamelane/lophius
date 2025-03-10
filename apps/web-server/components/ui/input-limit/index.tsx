'use client';
import {useId} from "react";
import * as React from "react";
import {InputCustom} from "@/components/ui/input-custom";
import {useCharacterLimit} from "@/components/ui/input-limit/use-character-limit";

interface InputLimitProps extends React.InputHTMLAttributes<HTMLInputElement> {
	maxLength?: number;
}

export default function InputLimit({ maxLength, ...props }: InputLimitProps) {
	const id = useId();
	const {
		characterCount,
		handleChange,
		maxLength: limit,
		value,
	} = useCharacterLimit({maxLength: maxLength ?? 50});
	
	return (
		<div className="relative">
			<InputCustom
				id={id}
				type="text"
				value={value}
				maxLength={maxLength}
				className="peer pe-14"
				onChange={handleChange}
				aria-describedby={`${id}-description`}
				{...props}
			/>
			<div
				role="status"
				aria-live="polite"
				id={`${id}-description`}
				className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
			>
				{characterCount}/{limit}
			</div>
		</div>
	)
}