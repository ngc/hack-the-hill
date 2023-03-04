/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';
import {  TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';


function App(): JSX.Element {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef<Camera>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  if (device == null) return <>
  <View>
    <Text>No back camera found</Text>
  </View>
  </>;

  return (
    // overlay a button on top of the camera

    <View style={{flex: 1}}>
     {currentPhoto && <Image 
        source={{
          uri: currentPhoto
        }}
      style={{flex: 1}} /> }
      <Camera
        style={StyleSheet.absoluteFill}
        ref={camera}
        photo={true}
        device={device}
        isActive={true}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: 'blue',
        }}
        onPress={async () => {
          const photo = await camera.current?.takePhoto({
            flash: 'on',
          });
          // save the photo to camera roll
          setCurrentPhoto(("file//" + photo?.path) ?? null);
          console.log(photo?.path);
        }}
      />
    </View>
  );
}


export default App;
