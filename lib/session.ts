import 'server-only'
import {cookies} from "next/headers";
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: { userId: string; expiresAt: Date }) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload
	} catch {
		console.log('Failed to verify session')
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
	const session = await encrypt({ expiresAt, userId })
	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		expires: expiresAt,
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secure: true,
	})
}