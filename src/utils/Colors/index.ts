
const WHITE = '#fff'
const BLACK = '#0C0E0D'

// Patrick's Green
const patricksGreenHex = '#48a719'
const patricksGreenHue = 100
const patricksGreenSaturation = 74
const patricksGreenLightness = 38
const patricksGreen = `hsl(${patricksGreenHue} ${patricksGreenSaturation}% ${patricksGreenLightness}%)`

// Brand
const brandHue = patricksGreenHue
const brandSaturation = patricksGreenSaturation
const brandLightness = patricksGreenLightness
const brand = `hsl(${brandHue} ${brandSaturation}% ${brandLightness}%)`

// Red
const redHue = 358
const redSaturation = 100
const redLightness = 64
const red = `hsl(${redHue} ${redSaturation}% ${redLightness}%)`

// Green
const greenHue = 134
const greenSaturation = 35
const greenLightness = 50
const green = `hsl(${greenHue}, ${greenSaturation}%, ${greenLightness}%)`

// Yellow
const yellowHue = 45
const yellowSaturation = 95
const yellowLightness = 55
const yellow = `hsl(${yellowHue}, ${yellowSaturation}%, ${yellowLightness}%)`

// Blue
const blueHue = 210
const blueSaturation = 45
const blueLightness = 52
const blue = `hsl(${blueHue}, ${blueSaturation}%, ${blueLightness}%)`

export const Colors = {
  patricksGreen,
  white: WHITE,
  black: BLACK,
  light: {
    white: WHITE,
    black: BLACK,
    default: BLACK,
    red: red,
    green: green,
    blue: blue,
    yellow: yellow,
    brand: brand,
    brand2: `hsl(${brandHue}, ${brandSaturation}%, 61%)`,
    surface: `hsl(${brandHue}, 20%, 99%)`,
    surface2: `hsl(${brandHue}, 23%, 97%)`,
    surface3: `hsl(${brandHue}, 20%, 95%)`,
    surface4: `hsl(${brandHue}, 15%, 85%)`,
    surface5: `hsl(${brandHue}, 15%, 70%)`,
    surface6: `hsl(${brandHue}, 12.5%, 75%)`,
    redSurface1: `hsl(${redHue}, 50%, 92.5%)`,
    redSurface2: `hsl(${redHue}, 50%, 17.5%)`,
    redSurface3: `hsl(${redHue}, 80%, 75%)`,
    greenSurface1: `hsl(${greenHue}, 50%, 92.5%)`,
    greenSurface2: `hsl(${greenHue}, 50%, 17.5%)`,
    greenSurface3: `hsl(${greenHue}, 67.5%, 75%)`,
    yellowSurface1: `hsl(${yellowHue}, 50%, 92.5%)`,
    yellowSurface2: `hsl(${yellowHue}, 50%, 17.5%)`,
    yellowSurface3: `hsl(${yellowHue}, 70%, 65%)`,
    blueSurface1: `hsl(${blueHue}, 50%, 92.5%)`,
    blueSurface2: `hsl(${blueHue}, 50%, 17.5%)`,
    blueSurface3: `hsl(${blueHue}, 70%, 65%)`,
    text: `hsl(${brandHue}, ${brandSaturation}%, 2%)`,
    text2: `hsl(${brandHue}, 5%, 25%)`,
    text3: `hsl(${brandHue} 5% 25%)`,
  },
  dark: {
    white: WHITE,
    black: BLACK,
    default: WHITE,
    red: `hsl(${redHue}, ${redSaturation / 1.15}%, ${redLightness / 1}%)`,
    green: `hsl(${greenHue}, ${greenSaturation / 1.35}%, ${greenLightness / 1.275}%)`,
    yellow: `hsl(${yellowHue}, ${yellowSaturation / 1.35}%, ${yellowLightness / 1.275}%)`,
    blue: blue,
    brand: `hsl(${brandHue} ${brandSaturation / 1.4}% ${brandLightness / 1.25}%)`,
    brand2: `hsl(${brandHue}, ${brandSaturation / 1.4}%, ${brandLightness * .975}%)`,
    surface: `hsl(${brandHue}, 10%, 15%)`,
    surface2: `hsl(${brandHue}, 10%, 17.5%)`,
    surface3: `hsl(${brandHue}, 5%, 20%)`,
    surface4: `hsl(${brandHue}, 5%, 25%)`,
    surface5: `hsl(${brandHue}, 5%, 35%)`,
    surface6: `hsl(${brandHue}, 3%, 55%)`,
    redSurface1: `hsl(${redHue}, 25%, 17.5%)`,
    redSurface2: `hsl(${redHue}, 10%, 17.5%)`,
    redSurface3: `hsl(${redHue}, 32.5%, 45%)`,
    greenSurface1: `hsl(${greenHue}, 25%, 17.5%)`,
    greenSurface2: `hsl(${greenHue}, 10%, 17.5%)`,
    greenSurface3: `hsl(${greenHue}, 32.5%, 45%)`,
    yellowSurface1: `hsl(${yellowHue}, 25%, 17.5%)`,
    yellowSurface2: `hsl(${yellowHue}, 10%, 17.5%)`,
    yellowSurface3: `hsl(${yellowHue}, 32.5%, 45%)`,
    blueSurface1: `hsl(${blueHue}, 25%, 17.5%)`,
    blueSurface2: `hsl(${blueHue}, 10%, 17.5%)`,
    blueSurface3: `hsl(${blueHue}, 32.5%, 45%)`,
    text: `hsl(${brandHue} 20% 90%)`,
    text2: `hsl(${brandHue} 10% 75%)`,
    text3: `hsl(${brandHue} 10% 75%)`,
  },
}
