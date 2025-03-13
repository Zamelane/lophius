import {ServerResponse} from "@/interfaces";

export function MakeResponse<T>(data: T, success: boolean = true, message?: string): ServerResponse<T> {
	return {
		message,
		success,
		content: data
	}
}