import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'

import Button from '@/components/composites/Button'
import View from '@components/elements/View'
import { StatusBar } from 'expo-status-bar'

export default function SettingsScreen() {
  const navigation = useNavigation()

  React.useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: 'Settings',
      headerTitleStyle: {
        fontSize: 21,
        fontWeight: '600',
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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="Close"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  button: {
    height: 44
  }
})
