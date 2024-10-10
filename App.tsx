import { StyleSheet, TextInput, View, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { RosProvider } from './components/RosContext';
import Teleop from './components/Teleop';
import Menu from './components/Menu';
import MapView from './components/MapView';
import CameraView from './components/CameraView';
import TestView from './components/TestView';
import { useState } from 'react';


export default function App() {
  const [rosIp, setRosIp] = useState<string>("")
  const [view, setView] = useState<string>("")

  const submitIp = (ip:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    setRosIp(ip.nativeEvent.text)
  }

  if (!rosIp) {
    return (
      <View style={styles.container}>
        <Text>Enter the IP of the websocket connection to Rosbridge:</Text>
        <TextInput onSubmitEditing={(ip:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => submitIp(ip)} style={styles.ipInput}></TextInput>
      </View>
    )
  }
  else {
    return (
      <RosProvider ip={rosIp}>
        <View style={styles.container}>
          <Text>Connected to: {rosIp}</Text>
            {view === "map" ? <MapView></MapView>:null}
            {view === "camera" ? <CameraView></CameraView>:null}
          <Teleop></Teleop>
          <Menu setView={setView}></Menu>
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
