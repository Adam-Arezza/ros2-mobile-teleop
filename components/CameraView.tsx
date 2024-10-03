import React, {useState} from 'react'
import {View, Image, Text} from 'react-native'
import TopicSubscriber from './TopicSubscriber'


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
//need to figure out a way to make the image not flicker when the src changes
//cache?
//fastimage?
    <View>
        <Text>Camera View</Text>
    {image? 
    <View>
       <Image
            source={{uri:image}}
            style={{width:300, height: 200}}
            resizeMode='contain'
            fadeDuration={0}
            defaultSource={{uri:image}}
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
