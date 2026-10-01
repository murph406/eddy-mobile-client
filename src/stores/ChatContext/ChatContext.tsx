import React from 'react'

export type ChatContextType = {
}

const ChatContext = React.createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

  const value: ChatContextType = {
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = React.useContext(ChatContext)
  
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }

  return context
}