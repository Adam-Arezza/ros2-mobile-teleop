import React, {useContext, useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import { RosContext } from './RosContext'
import ROSLIB from 'roslib'


const MapView = () => {
    const [mapData, setMapData] = useState()

    const ros = useContext(RosContext) 

    useEffect(() => {
        if (ros) {
           const mapListener = new ROSLIB.Topic({
               ros: ros,
               name: '/map',
               messageType: 'nav_msgs/OccupancyGrid',
               })

            mapListener.subscribe((message: any) => {
                console.log('Received map data')
                setMapData(message)
           })

            // Cleanup when component unmounts
            return () => {mapListener.unsubscribe()}
            } 
            }, [ros])

    return (
        <View>
            <Text>Map view</Text>
        </View>
)
}

export default MapView
