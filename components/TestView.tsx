import React, {useState} from 'react'
import {View, Text} from 'react-native'
import TopicSubscriber from './TopicSubscriber'


const TestView = () => {
    const [data, setData] = useState<string>('')

    const handleData = (data:any) => {
        const dataString = `${data.data}`
        setData(dataString)
    }

return (
    <View>
       <Text>{data}</Text>
        <TopicSubscriber 
            topic="/chatter" 
            topicType="std_msgs/String" 
            onMessage={handleData}>
        </TopicSubscriber>
    </View>
)
}

export default TestView
