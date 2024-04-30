import { StyleSheet, TextInput, View, Text } from 'react-native';
import { RosProvider } from './components/RosContext';
import Teleop from './components/Teleop';
import { useState, useEffect } from 'react';

export default function App() {
  const [rosIp, setRosIp] = useState("")

  const submitIp = (ip) => {
    setRosIp(ip.nativeEvent.text)
  }

  if (!rosIp) {
    return (
      <View style={styles.container}>
        <Text>Enter the IP of the websocket connection to Rosbridge:</Text>
        <TextInput onSubmitEditing={(ip) => submitIp(ip)} style={styles.ipInput}></TextInput>
      </View>
    )
  }
  else {
    return (
      <RosProvider ip={rosIp}>
        <View style={styles.container}>
          <Text>Connected to: {rosIp}</Text>
          <Teleop></Teleop>
        </View>
      </RosProvider>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ipInput: {
    width: '50%',
    borderWidth: 1
  }
});
