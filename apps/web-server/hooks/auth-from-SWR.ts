'use client'

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/components/helps/auth-context";
import { ClientResponse, CurrentUserInfo } from "@/interfaces"; 

export function AuthFromSWR() {
	const { data } = useSWR<ClientResponse<CurrentUserInfo>>('/api/users/me', fetcher, {
		fallbackData: useAuth(),
		revalidateOnMount: false
	})

	return data?.content
}