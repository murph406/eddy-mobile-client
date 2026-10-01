import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'

import useStyles from '@/hooks/useStyles'
import { useMapContext } from '@/stores/MapContext'
import { ThemeContextType, useThemeContext } from '@/stores/ThemeContext'
import View from '@components/elements/View'

export default function PinScreen() {
  const { setPin, goToUserLocation } = useMapContext()
  const navigation = useNavigation()
  const s = useStyles(createStyles)
  const { scheme } = useThemeContext()

  React.useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: 'Pin',
      headerTitleStyle: {
        fontSize: 21,
        color: scheme === 'light' ? 'black' :'white',
        fontWeight: '700',
      },
      unstable_headerRightItems: () => [
        {
          type: 'button',
          label: 'Close',
          icon: {
            type: 'sfSymbol',
            name: 'xmark',
          },
          onPress: () => {
            setPin(null)
            goToUserLocation()
            navigation.goBack()
          },
        },
      ],
    })
  }, [navigation, scheme])

  return (
    <View style={s.container}>
      <StatusBar style="auto" />
    </View>
  )
}


const createStyles = (theme: ThemeContextType) => {
  const { vars } = theme
  const { unit } = vars

  return {
    ...StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: unit,
        paddingTop: unit,
        paddingBottom: unit * 1.5,
      },
      button: {
        height: unit * 3.75
      }
    }),
  }
}

