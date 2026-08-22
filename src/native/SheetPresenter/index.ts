import { NativeModules } from 'react-native'

const { SheetPresenter } = NativeModules

export function presentTestSheet(): Promise<void> {
  return SheetPresenter.presentTestSheet()
}