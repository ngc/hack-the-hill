import { Camera, CameraType } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = React.useRef<Camera>(null);

  if (!permission) {
    return <Button title="Request Permission" onPress={requestPermission} />;
  }

  if (!permission.granted) {
    return <View style={
      {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }
    }>
      <Button title="Request Permission" onPress={requestPermission} />
      <TouchableOpacity onPress={requestPermission}>
        <Text>Request Permission</Text>
      </TouchableOpacity>
    </View>;
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function convertURIToBase64Image (uri: string) {
    // take the uri from a file and convert it to a base64 image
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }
    );
    return base64;
  }

  async function compressImage (image: string) {
    // compress the image to a smaller size so that it can be sent to the server
    const compressedImage = await ImageManipulator.manipulateAsync(
      image,
      [{ resize: { width: 200 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );
    return await convertURIToBase64Image(compressedImage.uri);
  }

  async function takePicture() {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      const base64 = (await convertURIToBase64Image(photo.uri)) as string;
      const compressedImage = await compressImage(base64);

      console.log(compressedImage);
    }
  }

  // detect if the camera is being moved around and if it isnt then take a picture
  // if the camera is being moved around then dont take a picture

  return (
    <View style={styles.container}>
      <Camera style={
        styles.camera
      } type={type}
        ref={camera}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={takePicture}>
            <Image
              source={require('./assets/Vector.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});
