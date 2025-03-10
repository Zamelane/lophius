'use client';

import {User, ContentResponse} from "@/interfaces";
import {useState, Dispatch, useContext, createContext, SetStateAction} from 'react';

const AuthContext = createContext<ContentResponse<User>>({content: undefined});
let _setAuth: Dispatch<SetStateAction<ContentResponse<User>>>
export const AuthProvider = ({
	children,
	initialData
}: { children: React.ReactNode; initialData: ContentResponse<User> }) => {
	const [auth, setAuth] = useState<ContentResponse<User>>(initialData)
	_setAuth = setAuth
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export const clearAuth = () => {
	console.log('clearAuth')
	_setAuth({content: undefined})
}
export const setAuth = (auth: ContentResponse<User>) => {
	console.log('setAuth')
	console.log(auth)
	_setAuth(auth)
}