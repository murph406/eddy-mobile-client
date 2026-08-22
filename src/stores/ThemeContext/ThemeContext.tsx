import React from 'react'

import { Vars } from '@/utils/Vars'
import { Colors } from '@utils/Colors'
import { useColorScheme } from 'react-native'

export type ThemeContextType = {
  colors: typeof Colors['dark'] & {
    dark: typeof Colors['dark']
    light: typeof Colors['light']
  },
  vars: typeof Vars,
  hslToHex: (hsl: string) => string
}

const ThemeContext = React.createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme()

  const colors = React.useMemo(() => {
    const scheme = colorScheme === 'dark' ? 'dark' : 'light'

    return {
      dark: Colors['dark'],
      light: Colors['light'],
      ...Colors[scheme]
    }
  }, [colorScheme])

  function hslToHex(hsl: string = '') {
    const [h = 0, s = 0, l = 0] = hsl.match(/\d+\.?\d*/g)!.map(Number)
    const sl = s / 100
    const ll = l / 100

    const a = sl * Math.min(ll, 1 - ll)
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }

    return `#${f(0)}${f(8)}${f(4)}`
  }

  const value: ThemeContextType = {
    colors,
    hslToHex,
    vars: Vars,
  }


  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}