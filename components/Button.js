import { Pressable } from 'react-native'

export default function Button({children, style, onPress }) {
    return (
        <Pressable style={style} onPress={onPress}>
            {children}
        </Pressable>
    )
}
