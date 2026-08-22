import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'

import { ThemeProvider } from '@stores/ThemeContext'
import Router from './src/router'

const App = () => {
    return (
        <NavigationContainer>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </NavigationContainer>
    )
}


registerRootComponent(App)
