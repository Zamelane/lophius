'use client'

import {User} from "@/interfaces";
import React, {createContext} from 'react'

type authContextType = {
  user: null | User
}

export const AuthContext = createContext<authContextType>({
  user: null
})

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useAuthProvider() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = React.useState<null|User>(null)

  return {
    user
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadUser() {

}