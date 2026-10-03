import React from 'react'
import { Text as ReactText, StyleSheet, View } from 'react-native'

import GlassSurface from '@/components/composites/GlassSurface'
import { ThemeContextType } from '@/stores/ThemeContext'
import Text from '@components/elements/Text'
import useStyles from '@hooks/useStyles'
import TextButton from '../TextButton'

type TextType = React.ComponentProps<typeof Text>['type']

export type SectionProps = {
  label?: string
  minHeight?: number
  suffix?: string
  loading?: boolean
  children?: React.ReactNode
  onPressAll?: () => void
}

type StyleProps = {
  minHeight: number
}

const Section = ({
  label = 'label',
  minHeight = 0,
  suffix,
  loading = false,
  children,
  onPressAll,
}: SectionProps) => {
  const s = useStyles(createStyles, { minHeight })

  return (
    <View style={s.container}>
      <View style={s.textWrapper}>
        <View>
          <ReactText>
            <Text type='body' color='text2' weight='semibold'>{label}</Text>
            <ReactText> </ReactText>
            {suffix && <Text type='body' color='text2' style={s.suffix}>{suffix}</Text>}
          </ReactText>
        </View>
        {onPressAll && <TextButton type='body' onPress={onPressAll}>View All</TextButton>}
      </View>

      <GlassSurface cornerRadius={24} style={s.contentWrapper} glassStyle='clear'>
        {children}
      </GlassSurface>

    </View>
  )
}

const createStyles = (theme: ThemeContextType, _: unknown, props: StyleProps) => {
  const { vars } = theme
  const { minHeight } = props
  const { unit, half } = vars

  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      width: '100%',
      gap: vars.half,
      height: 'auto'
    },
    textWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '100%',
      paddingLeft: unit * 1.25
    },
    contentWrapper: {
      paddingHorizontal: unit * 1.5,
      paddingTop: half,
      gap: unit,
      minHeight,
      width: '100%'
    },
    suffix: {
      marginTop: vars.half * 0.75,
    },
  })
}

export default Section