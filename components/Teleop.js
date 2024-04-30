import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Message from 'roslib/src/core/Message'
import TeleopSettings from './TeleopSettings'
import TopicPublisher from './TopicPublisher'

const Teleop = () => {
    const [cmdVel, setCmdVel] = useState({})
    const [vels, setVels] = useState([])

    const createTwistMessage = (linear, angular) => {
        if(vels.length > 0) {
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

    const getVals = (l, a) => {
        setVels([l,a])
    }

    return (
        <View style={mainContainer}>
            <TeleopSettings getVals={getVals}></TeleopSettings>
            {Object.keys(cmdVel).length > 0? <Text>Linear: {cmdVel.linear.x} m/s</Text> : null}
            {Object.keys(cmdVel).length > 0? <Text>Angular: {cmdVel.angular.z} m/s</Text> : null}
            <View style={inputRow}>
                <TouchableOpacity title='left turn' onPress={() => createTwistMessage(vels[0],vels[1])}>
                    <Image style={controlArrow} source={require('../assets/leftTurn.jpg')}></Image>
                </TouchableOpacity>

                <TouchableOpacity title='forward' onPress={() => createTwistMessage(vels[0],0.0)}>
                    <Image style={controlArrow} source={require('../assets/upArrow.jpg')}></Image>
                </TouchableOpacity>

                <TouchableOpacity title='right turn' onPress={() => createTwistMessage(vels[0],-vels[1])}>
                    <Image style={controlArrow} source={require('../assets/rightTurn.jpg')}></Image>
                </TouchableOpacity>

            </View>
            <View style={inputRow}>
                <TouchableOpacity title='left spin' onPress={() => createTwistMessage(0.0,vels[1])}>
                    <Image style={controlArrow} source={require('../assets/leftArrow.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity title='stop' onPress={() => createTwistMessage(0.0,0.0)}>
                    <Image style={[controlArrow, robotImageStyle]} source={require('../assets/robot.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity title='right spin' onPress={() => createTwistMessage(0.0,-vels[1])}>
                    <Image style={controlArrow} source={require('../assets/rightArrow.jpg')}></Image>
                </TouchableOpacity>

            </View>
            <View style={inputRow}>
                <TouchableOpacity title='back left turn' onPress={() => createTwistMessage(-vels[0], -vels[1])}>
                    <Image style={controlArrow} source={require('../assets/backLeft.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity title='reverse' onPress={() => createTwistMessage(-vels[0],0.0)}>
                    <Image style={controlArrow} source={require('../assets/downArrow.jpg')}></Image>
                </TouchableOpacity>
                <TouchableOpacity title='back right turn' onPress={() => createTwistMessage(-vels[0],vels[1])}>
                    <Image style={controlArrow} source={require('../assets/backRight.jpg')}></Image>
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

const robotImageStyle = StyleSheet.create({
    width: 180,
    height: 180
})

const mainContainer = StyleSheet.create({
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const inputRow = StyleSheet.create({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
})

const controlArrow = StyleSheet.create({
    height: 75,
    width: 75,
    margin: 5

})

export default Teleop