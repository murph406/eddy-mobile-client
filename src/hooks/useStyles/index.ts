import React from 'react'

import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import useDimensions from '@hooks/useDimensions'
import { useThemeContext } from '@stores/ThemeContext'

type ThemeContextType = ReturnType<typeof useThemeContext>
type DimensionsType = ReturnType<typeof useDimensions>
type StyleSet = Record<string, ViewStyle | TextStyle | ImageStyle | string | number>

function useStyles<P, S extends StyleSet>(
  callback: (theme: ThemeContextType, dimensions: DimensionsType, props: P) => S = () => StyleSheet.create({}) as S,
  props?: P
): S {
  const theme = useThemeContext()
  const dimensions = useDimensions()

  return React.useMemo(() => callback(theme, dimensions, props as P), [theme, dimensions, props])
}

export default useStyles