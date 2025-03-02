// 'use client'
//
// import {User, AuthErrorResponse} from "@/interfaces";
// import React, {useEffect, useContext, createContext} from 'react'
//
// type authContextType = {
//   user: null | User
// }
//
// export const AuthContext = createContext<authContextType>({
//   user: null
// })
//
// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const auth = useAuthProvider()
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
// }
//
// function useAuthProvider(): authContextType {
//   const [user, setUser] = React.useState<null|User>(null)
//
//   // Subscribe to user on mount
//   useEffect(() => {
//     loadUser(setUser)
//   }, []);
//
//   return {
//     user
//   }
// }
//
// export function useAuth() {
//   return useContext(AuthContext)
// }
//
// async function loadUser(setUser: React.Dispatch<React.SetStateAction<null | User>>) {
//   const user: null | User & AuthErrorResponse = await fetch('/api/me')
//     .then(res => res.json())
//     .catch(e => {
//       console.error(e)
//       setTimeout(() => loadUser(setUser), 2500)
//       return null
//     })
//
//   if (typeof user?.id === 'number') {
//     setUser(user)
//   }
//   console.log(user)
// }