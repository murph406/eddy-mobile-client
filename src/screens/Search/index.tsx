import { StyleSheet } from 'react-native'

import View from '@components/elements/View'
import { StatusBar } from 'expo-status-bar'

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
