import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


type MenuProps = {
    setView: (v:string) => void
}

const Menu = ({setView}: MenuProps) => {

return (
<View style={viewButtons.container}>
    <TouchableOpacity style={viewButtons.buttons} onPress={() => setView("map")}>
    <Text style={viewButtons.buttonText}>Map</Text>
    </TouchableOpacity>
    <TouchableOpacity style={viewButtons.buttons} onPress={() => setView("camera")}>
    <Text style={viewButtons.buttonText}>Camera</Text>
    </TouchableOpacity>
</View>
)
}


const viewButtons = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: '100%',
        position: 'absolute',
        bottom: 35
    },
    buttons:{
        backgroundColor: 'black',
        width: '50%',
        padding: 10
    },

    buttonText:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default Menu
