
import { Platform, Text as ReactText, StyleSheet, TextProps } from 'react-native'

import useStyles from '@hooks/useStyles'
import { ThemeContextType } from '@stores/ThemeContext'

type TextType = 'body' | 'bodyBold' | 'default' | 'defaultBold' | 'title' | 'subtitle' | 'headline' | 'link'
type TextColor = 'text' | 'text2' | 'green' | 'red' | 'white'

interface Props extends TextProps {
  color?: TextColor
  type?: TextType
}

const Text = ({
  style,
  color = 'text',
  type = 'default',
  ...rest
}: Props) => {

  const s = useStyles(createStyles)

  return (
    <ReactText
      maxFontSizeMultiplier={1}
      style={[s[type], style, {
        color: s[color] as string,
      }]}
      {...rest}
    />
  )
}

const createStyles = (theme: ThemeContextType | null) => {
  const { colors } = theme!

  const styles = StyleSheet.create({
    body: {
      fontSize: 12,
      letterSpacing: .65,
      fontFamily: 'LatoFont',
    },
    bodyBold: {
      fontSize: 12,
      letterSpacing: .65,
      fontFamily: 'LatoFontBold',
    },
    default: {
      fontSize: 16,
      letterSpacing: .65,
    },
    defaultBold: {
      fontSize: 16,
      letterSpacing: .65,
      fontWeight: '600',
    },
    title: {
      fontSize: 25,
      letterSpacing: .65,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 21,
      letterSpacing: .65,
      fontWeight: 'bold',
    },
    headline: {
      fontSize: 21,
      letterSpacing: .65,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'FuturaFont' : 'LatoFontBold',
    },
    link: {
      fontSize: 16,
      letterSpacing: .65,
    },
  })

  const colorMap = {
    text: colors.text,
    text2: colors.text2,
    green: colors.green,
    red: colors.red,
    white: colors.white,
  }

  return { ...styles, ...colorMap }
}

export default Text