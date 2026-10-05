import {
    NativeSyntheticEvent,
    requireNativeComponent,
    useWindowDimensions,
    ViewProps,
} from 'react-native'

type NativeMapSheetProps = Omit<ViewProps, 'ref'> & {
    detents: number[]
    initialDetentIndex?: number
    onDetentChange?: (event: NativeSyntheticEvent<{ index: number }>) => void
}

const NativeMapSheet = requireNativeComponent<NativeMapSheetProps>('MapSheet')

type MapSheetProps = Omit<ViewProps, 'ref'> & {
    detents?: number[] // fractions of screen height --> e.g. [0.12, 0.5, 0.95]
    initialDetentIndex?: number
    onDetentChange?: (index: number) => void
}

export default function HomeSheet({
    detents = [0.12, 0.5, 0.925],
    initialDetentIndex = 0,
    onDetentChange,
    style,
    ...rest
}: MapSheetProps) {
    const { height } = useWindowDimensions()
    const sheetHeight = Math.max(...detents) * height

    return (
        <NativeMapSheet
            {...rest}
            detents={detents}
            initialDetentIndex={initialDetentIndex}
            onDetentChange={e => onDetentChange?.(e.nativeEvent.index)}
            style={[
                { position: 'absolute', left: 0, right: 0, bottom: 0, height: sheetHeight },
                style,
            ]}
        />
    )
}