import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TopicSubscriber from './TopicSubscriber'
import { GLView } from "expo-gl";
import Expo2DContext from "expo-2d-context";


const MapView = () => {
    
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [gridArray, setGridArray] = useState<number[]>([0])
    const [touchPoint, setTouchPoint] = useState<number[]>([])
    const [canvas, setCanvas] = useState()


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
        //console.log(ctx.width)
        //console.log(ctx.height)
        //console.log(width)
        //console.log(gridArray.length)
        const cellWidth = ctx.width / width
        const cellHeight = ctx.height / height
        for (let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                let idx = i * width + j
                if(gridArray[idx] === 0){
                    ctx.fillStyle = "white";
                }
                if(gridArray[idx] === 100){
                    ctx.fillStyle = "black";
                }
                ctx.fillRect(j*cellWidth, i*cellHeight, cellWidth, cellHeight);
            }
        }
        ctx.flush();
        setCanvas(canvas)
        }

        const handleTouchPoint = (event:any) => {
            setTouchPoint([event.nativeEvent.locationX,event.nativeEvent.locationY])
        }


        useEffect(() => {
            if(canvas && touchPoint.length > 0){
            const ctx = new Expo2DContext(canvas, {maxGradStops:1, 
                    renderWithOffscreenBuffer:true,
                    fastFillTesselation:true})
            ctx.fillStyle = 'red'
            //need to scale location based on ctx grid size
            console.log(touchPoint[0], touchPoint[1])
            console.log(ctx.width, ctx.height)
            //console.log(styles.mapCanvas.height)
            //console.log(styles.mapCanvas.width)
            let xLocation = touchPoint[0] * (ctx.width / styles.mapCanvas.width)
            let yLocation = touchPoint[1] * (ctx.height / styles.mapCanvas.height)            
            ctx.fillRect(xLocation,yLocation,15,15)
            ctx.flush()
            }
        },[touchPoint])

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
                    onTouchStart={(e) => {
                       handleTouchPoint(e) 
                    }}
                    ></GLView>}
        </View>
)
}

export default MapView

const styles = StyleSheet.create({
    mapCanvas: {
        height:275,
        width:300
    }
})
