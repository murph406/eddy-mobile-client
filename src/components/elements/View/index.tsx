import React from 'react'

import { View as ReactView, StyleSheet, ViewProps } from 'react-native'

import { useThemeContext } from '@stores/ThemeContext/ThemeContext'

const View = ({ style, ...rest }: ViewProps) => {
  const theme = useThemeContext()

  const themed = React.useMemo(() => ({
    backgroundColor: theme?.colors?.surface
  }), [theme])

  return (
    <ReactView
      style={[
        styles.container,
        themed,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default View