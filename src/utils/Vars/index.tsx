import { Dimensions, PixelRatio, Platform } from 'react-native'

import * as Device from 'expo-device'

const { width } = Dimensions.get("screen")
const smallIosDevices = [
    'iPhone3,1',
    'iPhone3,2',
    'iPhone3,3',
    'iPhone4,1',
    'iPhone5,1',
    'iPhone5,2',
    'iPhone5,3',
    'iPhone5,4',
    'iPhone6,1',
    'iPhone6,2',
    'iPhone8,4',
    'iPhone12,8',
    'iPhone14,6'
]

const normalize = (size: number) => {
    const newSize = size * width / 520
    let x = 0

    if (Platform.OS === 'android') x = 1
    if (smallIosDevices.includes(Device.modelId)) x = .75
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - x
}

const unit = normalize(16)

export const Vars = {
    unit,
    half: unit * .5,
    double: unit * 2,
    maxFontSizeMultiplier: 1,
    lineHeight: normalize(1.2),
    spacing: {
        half: unit * .5,
        unit: unit,
        double: unit * 1.25,
        triple: unit * 2.5
    },
    font: {
        lx: unit * 2.75,
        lg: unit * 2.1,
        md: unit * 1.6,
        sm: unit * 1.2,
        xs: unit,
    },
    radius: {
        sm: unit * .3,
        md: unit * .4,
        lg: unit * 1.65,
        xlg: unit * 2,
        xxl: unit * 3,
    },
    controls: {
        sm: unit * 3.25,
        lg: unit * 3.75
    }
}
