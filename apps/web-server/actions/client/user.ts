'use client'

import { clearAuth } from "@/components/helps/auth-context";
import {ClearCookies} from "@/actions/server/clear-cookies";

export async function UserLogout() {
	await ClearCookies()
	clearAuth()
}