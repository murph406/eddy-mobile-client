import React from "react"

import { AppState } from "react-native"

export const useAppState = () => {
    const [appState, setAppState] = React.useState(AppState.currentState)

    const isAppActive = React.useMemo(() => {
        return appState === 'active' ? true : false
    }, [appState])

    React.useEffect(() => {
        const subscription = AppState.addEventListener('change', setAppState)

        return () => subscription.remove()
    }, [])

    return isAppActive
}