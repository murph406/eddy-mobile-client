import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'

import { ChatProvider } from '@stores/ChatContext/ChatContext'
import { FlyBoxProvider } from '@stores/FlyBoxContext/FlyBoxContext'
import { MapProvider } from '@stores/MapContext'
import { ThemeProvider } from '@stores/ThemeContext'
import { UserProvider } from '@stores/UserContext'
import Router from './src/router'

const App = () => {
    return (
        <NavigationContainer>
            <ThemeProvider>
                <UserProvider>
                    <MapProvider>
                        <ChatProvider>
                            <FlyBoxProvider>
                                <Router />
                            </FlyBoxProvider>
                        </ChatProvider>
                    </MapProvider>
                </UserProvider>
            </ThemeProvider>
        </NavigationContainer>
    )
}

registerRootComponent(App)
