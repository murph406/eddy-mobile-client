import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import CardPicker, { CardPickerOption } from '@components/composites/CardPicker'
import Divider from '@components/elements/Divider'
import Section from '@components/elements/Section'
import Switch from '@components/elements/Switch'
import Text from '@components/elements/Text'
import useStyles from '@hooks/useStyles'
import { useMapContext } from '@stores/MapContext'
import { ThemeContextType, useThemeContext } from '@stores/ThemeContext'
import { useUserContext } from '@stores/UserContext'
import { MapMode } from '@utils/Types'

const MAP_STYLE_OPTIONS: CardPickerOption<MapMode>[] = [
  { id: 'outdoors', title: 'Outdoor', imageName: 'map-outdoor' },
  { id: 'topo', title: 'Topo', imageName: 'map-topo' },
  { id: 'satellite', title: 'Satellite', imageName: 'map-satellite' },
]

export default function SettingsScreen() {
  const navigation = useNavigation()
  const s = useStyles(createStyles)
  const { scheme } = useThemeContext()
  const { mapMode, setMapMode } = useMapContext()

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
        color: scheme === 'light' ? 'black' : 'white',
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

      <Section label='Map Mode'>
        <CardPicker
          options={MAP_STYLE_OPTIONS}
          selectedId={mapMode}
          onSelect={setMapMode}
        />
      </Section>


      <Section label='Account'>
        <View style={s.wrapper}>

          <View style={s.row}>
            <Text >Location Services</Text>

            <Switch
              value={locationsSwitchValue}
              onValueChange={validateLocationsPermissions}
            />
          </View>

          <Divider />

          <View style={s.row}>
            <Text>Push Notifications</Text>
            <Switch />
          </View>
        </View>

      </Section>
    </View>
  )
}

const createStyles = (theme: ThemeContextType) => {
  const { vars, colors } = theme
  const { unit, half } = vars

  const styles = {
    ...StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: unit,
        paddingTop: unit * 4.5,
        paddingBottom: unit * 1.5,
        gap: unit
      },
      wrapper: {
        paddingTop: half,
        paddingBottom: unit,
        gap: unit
      },
      cardPickerWrapper: {
        paddingVertical: unit,
        paddingHorizontal: half
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

