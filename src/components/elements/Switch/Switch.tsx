
import { Switch as ReactSwitch, SwitchProps as ReactSwitchProps } from 'react-native'

import { ThemeContextType } from '@/stores/ThemeContext'
import useStyles from '@hooks/useStyles'

type SwitchProps = ReactSwitchProps

const Switch = ({ value, onValueChange }: SwitchProps) => {
  const s = useStyles(createStyles)

  return (
    <ReactSwitch
      value={value}
      trackColor={{ false: s.disabled, true: s.active }}
      ios_backgroundColor={s.disabled}
      onValueChange={onValueChange}
    />
  )
}

const createStyles = (theme: ThemeContextType) => {
  const { colors } = theme
  const active = colors.brand
  const disabled = colors.surface

  return {active, disabled}
}



export default Switch
