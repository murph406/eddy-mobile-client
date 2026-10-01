import { requireNativeComponent, StyleSheet, View, ViewProps } from 'react-native'

type NativeGlassSurfaceProps = ViewProps & {
  glassStyle?: 'regular' | 'clear'
  glassTint?: string
  cornerRadius?: number
}

const NativeGlassSurface = requireNativeComponent<NativeGlassSurfaceProps>('GlassSurface')

type GlassSurfaceProps = ViewProps & {
  glassStyle?: 'regular' | 'clear'
  glassTint?: string
  cornerRadius?: number
}

export default function GlassSurface({
  children,
  style,
  glassStyle = 'clear',
  glassTint,
  cornerRadius = 0,
  ...rest
}: GlassSurfaceProps) {
  return (
    <View style={[{ backgroundColor: 'transparent'  }, style]} {...rest}>
      <NativeGlassSurface
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
        glassStyle={glassStyle}
        glassTint={glassTint}
        cornerRadius={cornerRadius}
      />

      {children}
    </View>
  )
}