import React from 'react'

export type FlyBoxContextType = {
}

const FlyBoxContext = React.createContext<FlyBoxContextType | null>(null)

export const FlyBoxProvider = ({ children }: { children: React.ReactNode }) => {

  const value: FlyBoxContextType = {
  }

  return (
    <FlyBoxContext.Provider value={value}>
      {children}
    </FlyBoxContext.Provider>
  )
}

export function useFlyBoxContext() {
  const context = React.useContext(FlyBoxContext)
  
  if (!context) {
    throw new Error('useFlyBoxContext must be used within a FlyBoxProvider')
  }

  return context
}