import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import GlassSurface from '@/components/composites/GlassSurface'
import Divider from '@/components/elements/Divider'
import Switch from '@/components/elements/Switch'
import Text from '@/components/elements/Text'
import useStyles from '@/hooks/useStyles'
import { ThemeContextType, useThemeContext } from '@/stores/ThemeContext'
import { useUserContext } from '@/stores/UserContext'
import { StatusBar } from 'expo-status-bar'

export default function SettingsScreen() {
  const navigation = useNavigation()
  const s = useStyles(createStyles)
  const { scheme } = useThemeContext()

  const {
    locationPermissionStatus,
    validateLocationsPermissions
  } = useUserContext()

  const locationsSwitchValue = React.useMemo(() => {
    if (locationPermissionStatus?.status === 'granted') return true
    return false
  }, [locationPermissionStatus])


  React.useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: 'Settings',
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
          onPress: () => navigation.goBack(),
        },
      ],
    })
  }, [navigation, scheme])


  return (
    <View style={s.container}>
      <StatusBar style="auto" />

      <GlassSurface cornerRadius={24} style={s.wrapper} glassStyle='clear'>
        <View style={s.row}>
          <Text>Location Services</Text>

          <Switch
            value={locationsSwitchValue}
            onValueChange={validateLocationsPermissions}
          />
        </View>

        <Divider />

        <View style={s.row}>
          <Text>Push Notifications</Text>

          <Switch
          />
        </View>

      </GlassSurface>

    </View>
  )
}

const createStyles = (theme: ThemeContextType) => {
  const { vars, colors } = theme
  const { unit } = vars

  const styles = {
    ...StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: unit,
        paddingTop: unit * 6,
        paddingBottom: unit * 1.5,
      },
      wrapper: {
        padding: vars.unit,
        gap: vars.unit
      },
      button: {
        height: unit * 3.75,
      },
      row: {
        flexDirection: 'row',
        gap: vars.unit,
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }),
  }

  const buttonColor = colors.brand

  return { ...styles, buttonColor }
}

