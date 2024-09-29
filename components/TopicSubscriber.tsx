import React,{useContext, useEffect} from "react";
import Topic from "roslib/src/core/Topic";
import { RosContext } from "./RosContext";


type TopicSubscriberProps = {
    topic:string,
    topicType:string,
    onMessage: (data:any) => void
}

const TopicSubscriber = ({topic, topicType, onMessage}: TopicSubscriberProps) => {
    const {ros}: any = useContext(RosContext)

    useEffect(() => {
        if(ros && topic && topicType) {
            const subscriber:any = new Topic({
                ros: ros,
                name: topic,
                messageType: topicType
            })

            subscriber.subscribe((data:any) => {
            onMessage(data.data)
        })
        }
    }, [ros])
    
    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default TopicSubscriber
