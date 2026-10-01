import { Coordinates } from '@/utils/Types'
import * as Location from 'expo-location'
import * as SplashScreen from "expo-splash-screen"
import React from 'react'

export type UserContextType = {
  location: Coordinates | null
  locationPermissionStatus: Location.LocationPermissionResponse | null
}

const UserContext = React.createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = React.useState<Coordinates | null>(null)
  const [locationPermissionStatus, setLocationPermissionStatus] = React.useState<Location.LocationPermissionResponse | null>(null)

  React.useEffect(() => {
    const run = async () => {
      try {
        const locationStatus = await getCurrentLocationPermissionStatus()
        if (locationStatus?.status === 'granted') await setUserLocation()
        setLocationPermissionStatus(locationStatus)
      } finally {
        SplashScreen.hideAsync()
      }
    }

    run()
  }, [])

  async function setUserLocation() {
    try {
      const res = await Location.getCurrentPositionAsync()

      setLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude
      })
    } catch (e) {
      console.log("Error getting location", e)
    }
  }

  async function getCurrentLocationPermissionStatus() {
    return Location.getForegroundPermissionsAsync()
  }

  const value: UserContextType = {
    location,
    locationPermissionStatus
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