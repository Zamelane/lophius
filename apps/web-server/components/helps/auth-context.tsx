'use client';

import {UserInfo, ContentResponse} from "@/interfaces";
import {useState, Dispatch, useContext, createContext, SetStateAction} from 'react';

const AuthContext = createContext<ContentResponse<UserInfo>>({content: undefined});
let _setAuth: Dispatch<SetStateAction<ContentResponse<UserInfo>>>
export const AuthProvider = ({
	children,
	initialData
}: { children: React.ReactNode; initialData: ContentResponse<UserInfo> }) => {
	const [auth, setAuth] = useState<ContentResponse<UserInfo>>(initialData)
	_setAuth = setAuth
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export const clearAuth = () => {
	console.log('clearAuth')
	_setAuth({content: undefined})
}
export const setAuth = (auth: ContentResponse<UserInfo>) => {
	console.log('setAuth')
	console.log(auth)
	_setAuth(auth)
}