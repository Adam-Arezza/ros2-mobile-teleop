import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TopicSubscriber from './TopicSubscriber'
import { GLView } from "expo-gl";
import Expo2DContext from "expo-2d-context";
import TopicPublisher from './TopicPublisher';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import {Message} from 'roslib/src/core'

enum Color {
    blue = "BLUE",
    red = "RED"
}

const MapView = () => {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [gridArray, setGridArray] = useState<number[]>([0])
    const [initialPosePoints, setInitialPosePoints] = useState<number[][]>([])
    const [goalPosePoints, setGoalPosePoints] = useState<number[][]>([])
    const [initialPose, setInitialPose] = useState<Message>()
    const [goalPose, setGoalPose] = useState<Message>()
    const [canvas, setCanvas] = useState()

    //TODO
    //subscribe to odometry
    //draw odometry on map
    //ensure initial pose and goal pose are correct on map

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

        const handleTouch = (event:any) => {
            let canvasPoint = [event.nativeEvent.locationX,event.nativeEvent.locationY]
            if(initialPosePoints.length === 0 && goalPosePoints.length === 0){
                setInitialPosePoints([canvasPoint])
                drawPoint(canvasPoint[0],canvasPoint[1],Color.blue.toLowerCase())
            }
            if(initialPosePoints.length === 1) {
                setInitialPosePoints([...initialPosePoints, canvasPoint])
            }
            if(initialPosePoints.length === 2 && goalPosePoints.length === 0){
                setGoalPosePoints([canvasPoint])
                drawPoint(canvasPoint[0],canvasPoint[1],Color.red.toLowerCase())
            }
            if(initialPosePoints.length === 2 && goalPosePoints.length === 1){
                setGoalPosePoints([...goalPosePoints, canvasPoint])
            }
        }

        const canvasToMapCoords  = (
            canvasX: number,
            canvasY: number,
            canvasWidth: number,
            canvasHeight: number,
            mapWidth: number,
            mapHeight: number,
            resolution: number,
            originX: number,
            originY: number
        ) =>  {
          const cellX = (canvasX / canvasWidth) * mapWidth;
          const cellY = (canvasY / canvasHeight) * mapHeight;
          const worldX = cellX * resolution + originX;
          const worldY = (mapHeight - cellY) * resolution + originY; // Flip Y
          return { x: worldX, y: worldY };
        }
        const createGoalPoseMessage = (x:Float,y:Float,theta:Float) => {
            //handle theta to quaternion

            const poseMsg = new Message({
              header: {
                stamp: { sec: 0, nanosec: 0 }, // rosbridge will fill this in automatically
                frame_id: 'map'               
                },
              pose: {
                      position: {
                          x: x, 
                          y: y,                  
                          z: 0.0
                      },
                      orientation: {
                          x: 0.0,
                          y: 0.0,
                          z: 0.0,
                          w: 1.0},
              }
            })
            return poseMsg
        }


        const createInitialPoseMessage = (x:Float,y:Float,theta:Float) => {
            //handle theta to quaternion

            const poseMsg = new Message({
              header: {
                stamp: { sec: 0, nanosec: 0 }, // rosbridge will fill this in automatically
                frame_id: 'map'               
                },
              pose: {
                  pose:{
                      position: {
                          x: x, 
                          y: y,                  
                          z: 0.0
                      },
                      orientation: {
                          x: 0.0,
                          y: 0.0,
                          z: 0.0,
                          w: 1.0},
                  },
                covariance: [
        0.25, 0,    0,  0,  0,  0,
        0,    0.25, 0,  0,  0,  0,
        0,    0,    0,  0,  0,  0,
        0,    0,    0,  0,  0,  0,
        0,    0,    0,  0,  0,  0,
        0,    0,    0,  0,  0,  0.06853891945200942 // orientation uncertainty
      ]
              }
            })
            return poseMsg
        }

        const drawPoint = (x:number, y:number, color:string) => {
            if(canvas){
                const ctx = new Expo2DContext(canvas, {maxGradStops:1, 
                                              renderWithOffscreenBuffer:true,
                fastFillTesselation:true})
                ctx.fillStyle = color
                let xCanvasLocation = x * (ctx.width / styles.mapCanvas.width)
                let yCanvasLocation = y * (ctx.height / styles.mapCanvas.height)
                ctx.fillRect(xCanvasLocation,yCanvasLocation,15,15)
                ctx.flush()
            }
        }

        const getThetaAngle = (points:number[][]) => {
            const xDiff = points[1][0] - points[0][0]
            const yDiff = points[1][1] - points[0][1]
            const theta = Math.atan2(yDiff,xDiff)
            return theta
        }

        useEffect(() => {
            if(canvas && initialPosePoints.length === 2 && goalPosePoints.length !== 2){
                const {x,y} = canvasToMapCoords(initialPosePoints[0][0], 
                                              initialPosePoints[0][1], 
                                              styles.mapCanvas.width, 
                                              styles.mapCanvas.height,
                                              width,
                                              height,
                                              0.05,
                                              -4.67,
                                              -4.62)
                console.log("Initial Pose Point")
                console.log(x,y)
                const theta = getThetaAngle(initialPosePoints)
                let poseMsg = createInitialPoseMessage(x,y,theta)
                setInitialPose(poseMsg)
                }

            if(canvas && goalPosePoints.length === 2){
                console.log(goalPosePoints)
                const {x,y} = canvasToMapCoords(goalPosePoints[0][0], 
                                          goalPosePoints[0][1], 
                                          styles.mapCanvas.width, 
                                          styles.mapCanvas.height,
                                          width,
                                          height,
                                          0.05,
                                          -4.67,
                                          -4.62)
                console.log("goal Pose Point")
                console.log(x,y)
                const theta = getThetaAngle(goalPosePoints)
                let goalPoseMsg = createGoalPoseMessage(x,y,theta)
                setGoalPose(goalPoseMsg)
                setInitialPosePoints([])
                setGoalPosePoints([])
            }

        },[initialPosePoints, goalPosePoints])

    return (
        <View style={styles.viewBorder}>
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
                       handleTouch(e) 
                    }}
                    ></GLView>}
            {goalPose? <TopicPublisher
                            topic="/goal_pose"
                            message={goalPose}
                            topicType="geometry_msgs/PoseStamped"
                        ></TopicPublisher>:null}
            {initialPose? <TopicPublisher
                            topic="/initialpose"
                            message={initialPose}
                            topicType="geometry_msgs/PoseWithCovarianceStamped"
                        ></TopicPublisher>:null}
        </View>
)
}

export default MapView

const styles = StyleSheet.create({
    mapCanvas: {
        height:275,
        width:300
    },
    viewBorder : {
        borderWidth:1,
        borderColor:"black"
    }
})
