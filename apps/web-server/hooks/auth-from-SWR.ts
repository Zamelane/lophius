'use client'

import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";
import {User, ClientResponse} from "@/interfaces";
import { useAuth } from "@/components/helps/auth-context";

export function AuthFromSWR() {
	const { data } = useSWR<ClientResponse<User>>('/api/users/me', fetcher, {
		fallbackData: useAuth(),
		revalidateOnMount: false
	})

	return data?.content
}