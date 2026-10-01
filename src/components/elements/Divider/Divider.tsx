
import { StyleSheet, View } from 'react-native'

import { ThemeContextType } from '@/stores/ThemeContext'
import useStyles from '@hooks/useStyles'

const Divider = () => {
  const s = useStyles(createStyles)
  return <View style={s.container} />
}

const createStyles = (theme: ThemeContextType) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      height: vars.lineHeight,
      backgroundColor: colors.surface4,
      zIndex: 1000,
    }, 
  })
}

export default Divider
