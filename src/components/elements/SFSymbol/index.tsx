import { requireNativeComponent, ViewProps } from 'react-native'

export type SymbolWeight = | 'ultraLight' | 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy' | 'black'

type NativeSFSymbolProps = Omit<ViewProps, 'ref'> & {
    name: string
    size?: number
    weight?: SymbolWeight
    color?: string
}

const NativeSFSymbol = requireNativeComponent<NativeSFSymbolProps>('SFSymbol')
type SFSymbolProps = NativeSFSymbolProps

export default function SFSymbol({
    name,
    size = 17,
    weight = 'regular',
    color,
    style,
    ...rest
}: SFSymbolProps) {
    return (
        <NativeSFSymbol
            {...rest}
            name={name}
            size={size}
            weight={weight}
            color={color}
            pointerEvents="none"
            style={[{ width: size, height: size }, style]}
        />
    )
}