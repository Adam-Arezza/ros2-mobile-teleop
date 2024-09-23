import React,{useContext, useEffect} from "react";
import Topic from "roslib/src/core/Topic";
import { RosContext } from "./RosContext";

type TopicPublisherProps = {
    topic:string,
    topicType:string,
    message:object
}

const TopicPublisher = ({topic, topicType, message}: TopicPublisherProps) => {
    const {ros}: any = useContext(RosContext)

    useEffect(() => {
        if(topic && message && topicType) {
            const publisher:any = new Topic({
                ros: ros,
                name: topic,
                messageType: topicType
            })
            publisher.advertise()
            publisher.publish(message)
        }
    }, [ros, topic, topicType, message])
    
    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default TopicPublisher
