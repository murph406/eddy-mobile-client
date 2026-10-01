import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PinScreen from '@/screens/Pin';
import SettingsScreen from '@/screens/Settings';
import { useThemeContext } from '@/stores/ThemeContext';
import HomeScreen from '@screens/Home';

export type HomeStackParamList = {
  Home: undefined
  Settings: undefined
  Pin: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

function AppStack() {
  const { scheme } = useThemeContext()
  const sheetBackgroundColor = scheme === 'light' ? `rgba(255, 255, 255, .35)` : 'transparent' 

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, .95],
          sheetGrabberVisible: false,
          sheetCornerRadius: 50,
          sheetInitialDetentIndex: 0,
          sheetExpandsWhenScrolledToEdge: true,
          contentStyle: { backgroundColor: sheetBackgroundColor },
        }}
      />

      <Stack.Screen
        name="Pin"
        component={PinScreen}
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.25, .95],
          sheetGrabberVisible: false,
          sheetCornerRadius: 30,
          sheetInitialDetentIndex: 0,
          sheetExpandsWhenScrolledToEdge: true,
          contentStyle: { backgroundColor: sheetBackgroundColor },
          sheetLargestUndimmedDetentIndex: 0,
        }}
      />
    </Stack.Navigator>
  )
}

export default function Router() {
  return (
    <AppStack />
  )
}
