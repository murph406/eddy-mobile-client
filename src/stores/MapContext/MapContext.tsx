import React from 'react'

export type MapContextType = {
}

const MapContext = React.createContext<MapContextType | null>(null)

export const MapProvider = ({ children }: { children: React.ReactNode }) => {

  const value: MapContextType = {
  }

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  )
}

export function useMapContext() {
  const context = React.useContext(MapContext)
  
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider')
  }

  return context
}