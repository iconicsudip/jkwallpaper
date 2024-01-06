import { View, Text } from 'react-native'
import React from 'react'

type T_EmptyProps = {
    text: string
}

export default function Empty({ text }: T_EmptyProps) {
    return (
        <View >
            <Text style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
            }}>{text}</Text>
        </View>
    )
}