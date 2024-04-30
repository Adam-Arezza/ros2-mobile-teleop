import React, { createContext, useState } from "react";
import ROSLIB, { TFClient } from "roslib/src/RosLib";

export const RosContext = createContext()
export const RosProvider = (props) => {
    const [status, setStatus] = useState("Not Connected")
    const { ip } = props

    const ros = new ROSLIB.Ros({
        url: `ws://${ip}:9090`
    })

    const tfClient = new TFClient({
        ros: ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0
    })
    ros.on('connection', () => {
        setStatus("Connected")
    })
    ros.on('close', () => {
        setStatus("Not Connected")
    })
    ros.on('error', (err) => {
        console.log(err)
    })


    return (
        <RosContext.Provider
            value={{
                ros: ros,
                status: status,
                tfClient: tfClient
            }}>
            {props.children}
        </RosContext.Provider>
    )

}
