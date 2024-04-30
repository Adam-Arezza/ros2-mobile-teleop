import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const TeleopSettings = (props) => {
    const [linear, setLinear] = useState(0.2)
    const [angular, setAngular] = useState(1.0)
    const {getVals} = props

    useEffect(() => {
        getVals(linear, angular)
    }, [linear,angular])

    return (
        <View style={inputRow}>
            <Text>Linear</Text>
            <TextInput style={inputStyle} onChangeText={newLinear => setLinear(Number(newLinear))}>{linear}</TextInput>
            <Text>Angular</Text>
            <TextInput style={inputStyle} onChangeText={newAngular => setAngular(Number(newAngular))}>{angular}</TextInput>
        </View>
    )
}

const inputStyle = StyleSheet.create({
    height: 30,
    borderWidth: 2,
    margin: 3
})

const inputRow = StyleSheet.create({
    flexDirection: 'row',
    justifyContent: 'center'
})

export default TeleopSettings