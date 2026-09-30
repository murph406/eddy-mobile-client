import { useNavigation } from '@react-navigation/native'
import Mapbox, { MapView } from '@rnmapbox/maps'
import React from 'react'
import { StyleSheet } from 'react-native'

import { presentTestSheet } from '@/native/SheetPresenter'
import { HomeStackParamList } from '@/router'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN)

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

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
          onPress: () => presentTestSheet(),
        },
        {
          type: 'button',
          label: 'Navigate Settings Page',
          icon: {
            type: 'sfSymbol',
            name: 'gearshape.fill',
          },
          onPress: () => navigation.navigate('Settings'),
          //         onPress: () => mapRef.current?.setMapType?.('standard')
          //         onPress: () => mapRef.current?.setMapType?.('satellite')
        },
      ],
    })
  }, [navigation])

  return (
    <MapView style={{ flex: 1 }} styleURL={Mapbox.StyleURL.Outdoors}>
      {/* <Camera zoomLevel={11} centerCoordinate={[-121.76, 46.85]} /> */}
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
