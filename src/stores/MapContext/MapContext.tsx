import { CameraRef } from '@maplibre/maplibre-react-native'
import { MapMode, Pin } from '@utils/Types'
import React from 'react'
import { useThemeContext } from '../ThemeContext'

export type MapContextType = {
  cameraRef: React.RefObject<CameraRef | null>
  pin: Pin | null
  setPin: React.Dispatch<React.SetStateAction<Pin | null>>
  goToUserLocation: () => void,
  mapTheme: string
  mapMode: MapMode,
  setMapMode: React.Dispatch<React.SetStateAction<MapMode>>
}

const MapContext = React.createContext<MapContextType | null>(null)

const key = process.env.EXPO_PUBLIC_MAPTILER_KEY
if (!key) throw new Error('Missing EXPO_PUBLIC_MAPTILER_KEY in .env')

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const cameraRef = React.useRef<CameraRef | null>(null)
  const [pin, setPin] = React.useState<Pin | null>(null)
  const [mapMode, setMapMode] = React.useState<MapMode>('outdoors')

  const { scheme } = useThemeContext()

  const mapTheme = React.useMemo(() => {

    const themes = {
      outdoors: {
        dark: `https://api.maptiler.com/maps/outdoor-v4-dark/style.json?key=${key}`,
        light: `https://api.maptiler.com/maps/outdoor-v4/style.json?key=${key}`
      },
      topo: {
        dark: `https://api.maptiler.com/maps/topo-v4-dark/style.json?key=${key}`,
        light: `https://api.maptiler.com/maps/topo-v4/style.json?key=${key}`
      },
      satellite: {
        dark: `https://api.maptiler.com/maps/hybrid-v4-dark/style.json?key=${key}`,
        light: `https://api.maptiler.com/maps/hybrid-v4/style.json?key=${key}`
      },
    }

    return themes[mapMode][scheme]
  }, [scheme, mapMode])

  async function goToUserLocation() {
    cameraRef.current?.flyTo({
      center: [-122.33, 47.61],
      zoom: 12,
      duration: 2750,
    })

    return
  }

  const value: MapContextType = {
    cameraRef,
    pin,
    setPin,
    goToUserLocation,
    mapTheme,
    mapMode,
    setMapMode
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