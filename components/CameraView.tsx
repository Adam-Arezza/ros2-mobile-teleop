import React, {useState} from 'react'
import {View, Text} from 'react-native'
import TopicSubscriber from './TopicSubscriber'
import {Image} from 'expo-image'

const CameraView = () => {
    const [image, setImage] = useState<any>()

    const handleImage = (imageData:any) => {
        try{
            const imageConverted = `data:image/jpeg;base64,${imageData.data}`
            setImage(imageConverted)
        }
        catch(err){console.log(`There was an error when handling the data: ${err}`)}
    }

return (
    <View>
        <Text>Camera View</Text>
    {image? 
    <View>
       <Image
            source={{uri:image}}
            style={{width:300, height: 200}}
            />

    </View>: null}

        <TopicSubscriber 
            topic="/video_frames" 
            topicType="std_msgs/String" 
            onMessage={handleImage}>
        </TopicSubscriber>
    </View>
)
}

export default CameraView
