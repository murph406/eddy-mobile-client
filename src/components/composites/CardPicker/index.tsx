import React from 'react'
import {
    NativeSyntheticEvent,
    requireNativeComponent,
    ViewProps,
} from 'react-native'

export type CardPickerOption<T extends string = string> = {
    id: T
    title: string
    imageName?: string
    systemImageName?: string
}

type NativeCardPickerProps = Omit<ViewProps, 'ref'> & {
    options: CardPickerOption[]
    selectedId?: string
    accentColor?: string
    onCardSelect?: (event: NativeSyntheticEvent<{ id: string }>) => void
}

const NativeCardPicker = requireNativeComponent<NativeCardPickerProps>('CardPicker')

const SPACING = 12
const MAX_FITTED_OPTIONS = 4
const SCROLLING_CARD_WIDTH = 88
const LABEL_HEIGHT = 24
const GLOW_PADDING = 16

type CardPickerProps<T extends string> = Omit<ViewProps, 'ref'> & {
    options: CardPickerOption<T>[]
    selectedId?: T
    accentColor?: string
    onSelect?: (id: T) => void
}

export default function CardPicker<T extends string>({
    options,
    selectedId,
    accentColor,
    onSelect,
    style,
    onLayout,
    ...rest
}: CardPickerProps<T>) {
    const [width, setWidth] = React.useState(0)
    const isScrolling = options.length > MAX_FITTED_OPTIONS
    const cardWidth = isScrolling ? SCROLLING_CARD_WIDTH : (width - SPACING * (options.length - 1)) / Math.max(options.length, 1)
    const height = width > 0 ? cardWidth + LABEL_HEIGHT + GLOW_PADDING : 0

    return (
        <NativeCardPicker
            {...rest}
            options={options}
            selectedId={selectedId}
            accentColor={accentColor}
            onCardSelect={e => {
                const option = options.find(o => o.id === e.nativeEvent.id)
                if (option) onSelect?.(option.id)
            }}
            onLayout={e => {
                setWidth(e.nativeEvent.layout.width)
                onLayout?.(e)
            }}
            style={[{ width: '100%', height }, style]}
        />
    )
}