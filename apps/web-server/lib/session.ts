import 'server-only'
import {cookies} from "next/headers";
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type payloadType = {
	userId: string
	expiresAt: Date
}

export async function encrypt(payload: payloadType) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = ''): Promise<null | payloadType> {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload as payloadType
	} catch {
		console.log('Failed to verify session')
		return null
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
	const session = await encrypt({ userId, expiresAt })
	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		path: '/',
		secure: true,
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
	})
}