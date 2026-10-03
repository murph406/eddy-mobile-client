import Text from '@/components/elements/Text'
import SFSymbol from '@components/elements/SFSymbol'
import useStyles from '@hooks/useStyles'
import { ThemeContextType } from '@stores/ThemeContext'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type ListRowProps = {
    label?: string
    icon?: string
    onPress?: () => void | null
    children?: React.ReactNode | null
}

export default function ListRow({ icon, label = 'List Row', onPress, children }: ListRowProps) {
    const s = useStyles(createStyles)

    return (
        <TouchableOpacity disabled={onPress == null} style={s.container} onPress={onPress}>
            <View style={s.textRow}>
                {icon && <SFSymbol name={icon} />}
                <Text >{label}</Text>
            </View>

            {children || <SFSymbol name='chevron.forward' />}
        </TouchableOpacity>
    )
}

const createStyles = (theme: ThemeContextType) => {
    const { vars } = theme
    const { unit } = vars

    const styles = {
        ...StyleSheet.create({
            container: {
                flexDirection: 'row',
                gap: vars.unit,
                justifyContent: 'space-between',
                alignItems: 'center',
                height: unit * 2,
            },
            textRow: {
                flexDirection: 'row',
                gap: vars.unit,
                alignItems: 'center'
            }
        }),
    }

    return styles
}

