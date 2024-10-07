import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TopicSubscriber from './TopicSubscriber'
import { GLView } from "expo-gl";
import Expo2DContext from "expo-2d-context";


const MapView = () => {
    
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [gridArray, setGridArray] = useState<number[]>([0])


    const getMapData = (map:any) => {
        const width:number = map.info.width
        const height:number = map.info.height
        const gridArray:number[] = map.data
        setWidth(width)
        setHeight(height)
        setGridArray(gridArray)
        console.log('new cell data!')
    }

    const createMap = (canvas:any) => {
        const ctx = new Expo2DContext(canvas, {maxGradStops:1, 
                                               renderWithOffscreenBuffer:true,
                                               fastFillTesselation:true})
        //width of a cell
        //height of a cell
        console.log(ctx.width)
        console.log(ctx.height)
        console.log(width)
        console.log(gridArray.length)
        //let x:number = 868
        //let y:number = 813 - 20
        const cellSize = 10
        for (let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                let idx = i * width + j
                if(gridArray[idx] === 0){
                    ctx.fillStyle = "white";
                }
                if(gridArray[idx] === 100){
                    ctx.fillStyle = "black";
                }
                ctx.fillRect(j*cellSize, i*cellSize, cellSize, cellSize);
            }
        }
        ctx.flush();
        }

    return (
        <View>
            <Text>Map view</Text>
            <TopicSubscriber
            topic='/map'
            topicType='nav_msgs/OccupancyGrid'
            onMessage={getMapData}
            ></TopicSubscriber> 
            {width===0?null:
            <GLView 
                    style={styles.mapCanvas}
                    onContextCreate={createMap}
                    ></GLView>}
        </View>
)
}

export default MapView

const styles = StyleSheet.create({
    mapCanvas: {
        borderColor: 'red',
        borderWidth: 2,
        height:275,
        width:300
    }
})
