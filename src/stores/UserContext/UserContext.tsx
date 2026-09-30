import React from 'react'

export type UserContextType = {
}

const UserContext = React.createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const value: UserContextType = {
  }


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = React.useContext(UserContext)
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}