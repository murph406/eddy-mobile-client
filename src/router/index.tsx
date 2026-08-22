import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@/screens/Settings';
import HomeScreen from '@screens/Home';

export type HomeStackParamList = {
  Home: undefined
  Settings: undefined
  Search: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

function AppStack() {
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
          sheetAllowedDetents: [0.5],
          sheetGrabberVisible: false,
          sheetCornerRadius: 20,
          sheetInitialDetentIndex: 0,
          sheetExpandsWhenScrolledToEdge: true,
          contentStyle: { backgroundColor: 'white' },
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
