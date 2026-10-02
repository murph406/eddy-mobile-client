import { TouchableOpacity } from 'react-native'

import Text from '../Text'

type TextButtonProps = React.ComponentProps<typeof Text> & {
  onPress?: () => void
}

const TextButton = ({ onPress, ...rest }: TextButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={.75}>
      <Text {...rest} />
    </TouchableOpacity>
  )
}

export default TextButton
