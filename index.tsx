import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'

import { ThemeProvider } from '@stores/ThemeContext'
import { UserProvider } from '@stores/UserContext'
import Router from './src/router'

const App = () => {
    return (
        <NavigationContainer>
            <ThemeProvider>
                <UserProvider>
                    <Router />
                </UserProvider>
            </ThemeProvider>
        </NavigationContainer>
    )
}


registerRootComponent(App)
