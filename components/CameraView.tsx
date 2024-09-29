import React, {useState} from 'react'
import {View, Image} from 'react-native'
import TopicSubscriber from './TopicSubscriber'
import {Buffer} from 'buffer'


const CameraView = () => {
    const [image, setImage] = useState<string>('')

    const handleImage = (imageData:Uint8Array) => {
        const binaryString = Buffer.from(imageData).toString('base64')       
        const imageConverted = `data:image/jpeg;base64,${binaryString}`
        console.log(`image data: ${imageConverted}`)
        setImage(imageConverted)
    }

return (
    <View>
    {image ? 
       <Image
            source={{uri:image}}
            style={{width:300, height: 200}}
            resizeMode='contain'/>: null}
        <TopicSubscriber 
            topic="/video_frames" 
            topicType="sensor_msgs/Image" 
            onMessage={handleImage}>
        </TopicSubscriber>
    </View>
)
}

export default CameraView
