import { HostComponent, requireNativeComponent, ViewProps } from 'react-native'

type NativeGlassButtonProps = ViewProps & {
  title?: string
  systemImageName?: string
  accentColor?: string
  fontSize?: number
  fontWeight?: 'ultraLight' | 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy' | 'black'
  onGlassButtonPress?: () => void
}

const NativeGlassButton: HostComponent<NativeGlassButtonProps> =
  requireNativeComponent<NativeGlassButtonProps>('GlassButton')

type GlassButtonProps = ViewProps & {
  title?: string
  systemImageName?: string
  accentColor?: string
  fontSize?: number
  fontWeight?: NativeGlassButtonProps['fontWeight']
  onPress?: () => void
}

export default function GlassButton({ onPress, ...rest }: GlassButtonProps) {
  return <NativeGlassButton {...rest} onGlassButtonPress={() => onPress?.()} />
}