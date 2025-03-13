'use client';

import {CurrentUserInfo, ContentResponse} from "@/interfaces";
import {useState, Dispatch, useContext, createContext, SetStateAction} from 'react';

const AuthContext = createContext<ContentResponse<CurrentUserInfo>>({content: undefined});
let _setAuth: Dispatch<SetStateAction<ContentResponse<CurrentUserInfo>>>
export const AuthProvider = ({
	children,
	initialData
}: { children: React.ReactNode; initialData: ContentResponse<CurrentUserInfo> }) => {
	const [auth, setAuth] = useState<ContentResponse<CurrentUserInfo>>(initialData)
	_setAuth = setAuth
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export const clearAuth = () => {
	console.log('clearAuth')
	_setAuth({content: undefined})
}
export const setAuth = (auth: ContentResponse<CurrentUserInfo>) => {
	console.log('setAuth')
	console.log(auth)
	_setAuth(auth)
}