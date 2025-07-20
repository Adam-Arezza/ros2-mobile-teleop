import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native'



type TeleopSettingsProps = {
    getVals: (l:number, a:number) => void
}


const TeleopSettings = ({getVals}:TeleopSettingsProps) => {
    const [linear, setLinear] = useState(0.2)
    const [angular, setAngular] = useState(1.0)


    useEffect(() => {
        getVals(linear, angular)
    }, [linear,angular])

    return (
        <View style={inputRowStyle.inputRow}>
            <Text>Linear</Text>
            <TextInput style={inputStyle.velocityInput} onChangeText={newLinear => setLinear(Number(newLinear))}>{linear}</TextInput>
            <Text>Angular</Text>
            <TextInput style={inputStyle.velocityInput} onChangeText={newAngular => setAngular(Number(newAngular))}>{angular}</TextInput>
        </View>
    )
}

const inputStyle = StyleSheet.create<{velocityInput: ViewStyle}>({
    velocityInput:{
        height: 40,
        borderWidth: 2,
        margin: 2
    }
})

const inputRowStyle = StyleSheet.create<{inputRow: ViewStyle}>({
    inputRow:{
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default TeleopSettings
