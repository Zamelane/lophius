"use client";

import { useState, ChangeEvent } from "react";

type UseCharacterLimitProps = {
	maxLength: number;
	initialValue?: string;
};

export function useCharacterLimit({ initialValue = "", maxLength }: UseCharacterLimitProps) {
	const [value, setValue] = useState(initialValue);
	const [characterCount, setCharacterCount] = useState(initialValue.length);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		if (newValue.length <= maxLength) {
			setValue(newValue);
			setCharacterCount(newValue.length);
		}
	};

	return {
		characterCount,
		handleChange,
		maxLength,
		value,
	};
}