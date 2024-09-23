import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageStyle, ViewStyle } from 'react-native'
import Message from 'roslib/src/core/Message'
import TeleopSettings from './TeleopSettings'
import TopicPublisher from './TopicPublisher'


type CmdVel = {
    linear: number,
    angular: number
}


const Teleop = () => {
    const [cmdVel, setCmdVel] = useState<CmdVel>({linear:0.0, angular:0.0})
    const [vels, setVels] = useState<number[]>([0.0, 0.0])


// only considering x from linear and z from angular for differential drive robot
    const createTwistMessage = (linear:number, angular:number) => {
        if(vels && vels.length > 0) {
            const message = new Message(
                {
                    linear: {
                        x: linear,
                        y: 0.0,
                        z: 0.0,
                    },
                    angular: {
                        x: 0.0,
                        y: 0.0,
                        z: angular
                    }
                }
            )
            setCmdVel(message)
        }
    }

    const getVals = (l:number, a:number) => {
        setVels([l,a])
    }

    return (
        <View style={mainContainerStyle.mainContainer}>
            <TeleopSettings getVals={getVals}></TeleopSettings>
            {cmdVel && Object.keys(cmdVel).length > 0? <Text>Linear: {cmdVel?.linear} m/s</Text> : null}
            {cmdVel && Object.keys(cmdVel).length > 0? <Text>Angular: {cmdVel?.angular} m/s</Text> : null}
            <View style={inputRowStyle.inputRow}>
                <TouchableOpacity onPress={() => createTwistMessage(vels[0],vels[1])}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/leftTurn.jpg')}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => createTwistMessage(vels[0],0.0)}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/upArrow.jpg')}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => createTwistMessage(vels[0],-vels[1])}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/rightTurn.jpg')}></Image>
                </TouchableOpacity>

            </View>
            <View style={inputRowStyle.inputRow}>
                <TouchableOpacity onPress={() => createTwistMessage(0.0,vels[1])}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/leftArrow.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwistMessage(0.0,0.0)}>
                    <Image style={[controlArrowStyle.controlArrow, robotImageStyle.robotImage]} source={require('../assets/robot.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwistMessage(0.0,-vels[1])}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/rightArrow.jpg')}></Image>
                </TouchableOpacity>

            </View>
            <View style={inputRowStyle.inputRow}>
                <TouchableOpacity onPress={() => createTwistMessage(-vels[0], -vels[1])}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/backLeft.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwistMessage(-vels[0],0.0)}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/downArrow.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwistMessage(-vels[0],vels[1])}>
                    <Image style={controlArrowStyle.controlArrow} source={require('../assets/backRight.jpg')}></Image>
                </TouchableOpacity>


            </View>
            {cmdVel ? <TopicPublisher
                topic="/cmd_vel"
                message={cmdVel}
                topicType="geometry_msgs/Twist" >
            </TopicPublisher> : null}
        </View >
    )
}

const robotImageStyle = StyleSheet.create<{robotImage:ImageStyle}>({
    robotImage:{
        width: 180,
        height: 180
    }
})

const mainContainerStyle = StyleSheet.create<{mainContainer: ViewStyle}>({
    
    mainContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const inputRowStyle = StyleSheet.create<{inputRow: ViewStyle}>({
    inputRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const controlArrowStyle = StyleSheet.create<{controlArrow: ImageStyle}>({
    controlArrow:{
        height: 75,
        width: 75,
        margin: 5
    }

})

export default Teleop
