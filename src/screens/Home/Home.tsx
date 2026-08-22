import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'

import MapView, { MapViewHandle } from '@/components/layouts/MapView'
import { HomeStackParamList } from '@/router'
import View from '@components/elements/View'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SearchBarCommands } from 'react-native-screens'


export default function Home() {
  const mapRef = React.useRef<MapViewHandle>(null)
  const searchBarRef = React.useRef<SearchBarCommands>(null)

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      headerSearchBarOptions: {
        ref: searchBarRef,
        placeholder: 'Search',
        onFocus: () => {
        },
      },
      unstable_headerRightItems: () => [
        {
          type: 'button',
          label: 'Navigate Current Location',
          icon: {
            type: 'sfSymbol',
            name: 'location.fill',
          },
          onPress: () => null,
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
    <MapView ref={mapRef}>
      <View style={styles.container}>

      </View>
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
