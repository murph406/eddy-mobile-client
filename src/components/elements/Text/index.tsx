import { Text as ReactText, TextProps, TextStyle } from 'react-native'

import useStyles from '@hooks/useStyles'
import { ThemeContextType } from '@stores/ThemeContext'

const TEXT_STYLES = {
  largeTitle:  { fontSize: 34, lineHeight: 41, fontWeight: '400', ramp: 'largeTitle' },
  title1:      { fontSize: 28, lineHeight: 34, fontWeight: '400', ramp: 'title1' },
  title2:      { fontSize: 22, lineHeight: 28, fontWeight: '400', ramp: 'title2' },
  title3:      { fontSize: 20, lineHeight: 25, fontWeight: '400', ramp: 'title3' },
  headline:    { fontSize: 17, lineHeight: 22, fontWeight: '600', ramp: 'headline' },
  body:        { fontSize: 17, lineHeight: 22, fontWeight: '400', ramp: 'body' },
  callout:     { fontSize: 16, lineHeight: 21, fontWeight: '400', ramp: 'callout' },
  subheadline: { fontSize: 15, lineHeight: 20, fontWeight: '400', ramp: 'subheadline' },
  footnote:    { fontSize: 13, lineHeight: 18, fontWeight: '400', ramp: 'footnote' },
  caption1:    { fontSize: 12, lineHeight: 16, fontWeight: '400', ramp: 'caption1' },
  caption2:    { fontSize: 11, lineHeight: 13, fontWeight: '400', ramp: 'caption2' },
} as const

const TEXT_DESIGNS = {
  default: undefined,    
  rounded: 'ui-rounded', 
  mono: 'ui-monospace', 
  serif: 'ui-serif', 
} 

const TEXT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
} as const

export type TextType = keyof typeof TEXT_STYLES
export type TextDesign = keyof typeof TEXT_DESIGNS
export type TextWeight = keyof typeof TEXT_WEIGHTS
export type TextColor = 'text' | 'text2' | 'green' | 'red' | 'white'

interface Props extends TextProps {
  type?: TextType
  color?: TextColor
  design?: TextDesign
  weight?: TextWeight
  tabular?: boolean
}

const Text = ({
  style,
  type = 'body',
  color = 'text',
  design = 'default',
  weight,
  tabular = false,
  maxFontSizeMultiplier = 1.5,
  ...rest
}: Props) => {
  const colors = useStyles(createStyles)
  const { ramp, ...typeStyle } = TEXT_STYLES[type]

  const resolvedStyle: TextStyle = {
    ...typeStyle,
    color: colors[color],
    fontFamily: TEXT_DESIGNS[design],
    ...(weight && { fontWeight: TEXT_WEIGHTS[weight] }),
    ...(tabular && { fontVariant: ['tabular-nums'] }),
  }

  return (
    <ReactText
      dynamicTypeRamp={ramp}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[resolvedStyle, style]}
      {...rest}
    />
  )
}

const createStyles = (theme: ThemeContextType | null) => {
  const { colors } = theme!

  return {
    text: colors.text as string,
    text2: colors.text2 as string,
    green: colors.green as string,
    red: colors.red as string,
    white: colors.white as string,
  }
}

export default Text