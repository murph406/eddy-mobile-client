import { Coordinates } from '@/utils/Types'
import * as Location from 'expo-location'
import * as SplashScreen from "expo-splash-screen"
import React from 'react'
import { Alert, AlertButton, Linking } from 'react-native'

export type UserContextType = {
  location: Coordinates | null
  locationPermissionStatus: Location.LocationPermissionResponse | null
  validateLocationsPermissions: () => Promise<void>
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

  async function requestLocationsPermissions() {
    let newStatus = await Location.getForegroundPermissionsAsync()

    if (newStatus?.status !== 'granted') newStatus = await Location.requestForegroundPermissionsAsync()
    setLocationPermissionStatus(newStatus)
  }


  const validateLocationsPermissions = async () => {
    const options: AlertButton[] = [{ text: 'OK', style: 'cancel' }]

    if (locationPermissionStatus?.status !== "granted") {
      let errTitle = 'Error'
      let errMessage = 'Please enable location services in your settings'

      if (!locationPermissionStatus?.canAskAgain) {
        options.push({ text: 'Settings', onPress: () => Linking.openURL('app-settings:') })
        Alert.alert(errTitle, errMessage, options)
      }

      if (locationPermissionStatus?.canAskAgain) {
        errTitle = 'Enable Location Services '
        errMessage = 'Eddy needs access to your location to help navigate you to your courts and events. You can change this anytime in Settings.'
        options.push({ text: 'Ok', onPress: requestLocationsPermissions })

      }

      Alert.alert(errTitle, errMessage, options)
    } else {
      const errTitle = 'Disable Notifications?'
      const errMessage = 'You can disable location services from your settings'

      options.push({ text: 'Settings', onPress: () => Linking.openURL('app-settings:') })
      Alert.alert(errTitle, errMessage, options)
    }

    return
  }


  const value: UserContextType = {
    location,
    locationPermissionStatus,
    validateLocationsPermissions
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