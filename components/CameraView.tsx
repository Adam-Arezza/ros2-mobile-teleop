import React, {useState} from 'react'
import {View, Image} from 'react-native'
import TopicSubscriber from './TopicSubscriber'


const CameraView = () => {
    const [image, setImage] = useState<string>('')

    const handleImage = (imageData:any) => {
        const imageConverted = `data:image/jpeg;base64,${imageData.data}`
        setImage(imageConverted)
    }

return (
    <View>
       <Image source={{uri:image}}
              style={{width:300, height: 200}}
              resizeMode='contain'/> 
        <TopicSubscriber 
            topic="/video_frames" 
            topicType="sensor_msgs/Image" 
            onMessage={handleImage}></TopicSubscriber>
    </View>
)
}

export default CameraView
