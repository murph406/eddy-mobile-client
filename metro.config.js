const path = require('path')

const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@screens': path.resolve(__dirname, 'src/screens'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@stores': path.resolve(__dirname, 'src/stores'),
  '@router': path.resolve(__dirname, 'src/router'),
  '@assets': path.resolve(__dirname, 'assets'),
}

module.exports = config