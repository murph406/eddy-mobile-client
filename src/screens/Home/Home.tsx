import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { presentTestSheet } from '@/native/SheetPresenter'
import { HomeStackParamList } from '@/router'
import useStyles from '@hooks/useStyles'
import { Camera, Map as MapView, Marker } from '@maplibre/maplibre-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMapContext } from '@stores/MapContext'
import { ThemeContextType } from '@stores/ThemeContext'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

const key = process.env.EXPO_PUBLIC_MAPTILER_KEY
if (!key) throw new Error('Missing EXPO_PUBLIC_MAPTILER_KEY in .env')

export default function Home() {
  const { cameraRef, mapTheme, pin, setPin, goToUserLocation } = useMapContext()
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const s = useStyles(createStyles)

  const { height } = useWindowDimensions()

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      unstable_headerRightItems: () => [
        {
          type: 'button',
          label: 'Navigate Current Location',
          icon: {
            type: 'sfSymbol',
            name: 'location.fill',
          },
          onPress: goToUserLocation,
        },
        {
          type: 'button',
          label: 'Navigate Settings Page',
          icon: {
            type: 'sfSymbol',
            name: 'gearshape.fill',
          },
          onPress: () => navigation.navigate('Settings'),
          onLongPress: presentTestSheet
        },
      ],
    })
  }, [navigation])

  function handleLongPress(event: any) {
    const coordinate = event.nativeEvent.lngLat as [number, number]

    setPin({ id: String(Date.now()), coordinate })
    navigation.navigate('Pin')
    cameraRef.current?.flyTo({
      center: coordinate,
      zoom: 17,
      duration: 1250,
      padding: { top: 0, right: 0, bottom: height / 2, left: 0 },
    })
  }

  return (
    <MapView style={{ flex: 1 }} mapStyle={mapTheme} onLongPress={handleLongPress} >
      <Camera ref={cameraRef} zoom={12} center={[-122.33, 47.61]} />

      {pin && (
        <Marker key={pin.id} lngLat={pin?.coordinate}>
          <View
            style={s.pin}
          />
        </Marker>
      )}
    </MapView>
  )
}


const createStyles = (theme: ThemeContextType | null) => {
  const { colors } = theme!

  const styles = StyleSheet.create({
    pin: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.brand,
      borderWidth: 3,
      borderColor: 'white',
    },
  })

  return styles
}
