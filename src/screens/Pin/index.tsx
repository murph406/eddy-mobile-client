import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'

import useStyles from '@/hooks/useStyles'
import { ThemeContextType } from '@/stores/ThemeContext'
import View from '@components/elements/View'

export default function PinScreen() {
  const navigation = useNavigation()
  const s = useStyles(createStyles)

  React.useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: 'Pin',
      headerTitleStyle: {
        fontSize: 21,
        color: 'white',
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
          onPress: () => navigation.goBack(),
        },
      ],
    })
  }, [navigation])

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

