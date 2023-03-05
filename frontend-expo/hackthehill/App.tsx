import { Camera, CameraType } from 'expo-camera';
import React, { Component, Ref, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import Svg, { Circle, G, Mask, Path, Rect } from 'react-native-svg';
import { Vibration } from 'react-native';

class AnimatedCircles extends Component {
  animValue: Animated.Value;
  circleColor: string = 'red';
  constantColor = false;
  constructor(props: {color?: string}) {
    super(props);

    this.animValue = new Animated.Value(0);
    if(this.props.color) this.constantColor = true;
    this.state = { 
      color: this.props.color ?? 'red',
    };
  }

  animateCircles() {
    const colors = ['red', '#fbbc05', 'green', 'blue'];
    const currentIndex = colors.indexOf(this.state.color as string);
    const nextIndex = (currentIndex + 1) % colors.length;
    const nextColor = colors[nextIndex];

  Animated.timing(this.animValue, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start(() => {
    if(!this.constantColor) this.setState({ color: nextColor });
    this.animValue.setValue(0);
    this.animateCircles();
  });
  }
  
  render() {
    const circleSize = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });
  
    const circleOpacity = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            backgroundColor: this.state.color,
            opacity: circleOpacity,
          }}
        />
      </View>
    );
  }
  componentDidMount() {
    this.animateCircles();
    setInterval(() => {
      this.animValue.setValue(0);
      //Vibration.vibrate(10);
      Vibration.cancel();
    }, 1000);
  }  
}

class ColorDisplay extends Component {
  componentDidMount(): void {
      // text to speech read out the color
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    // text to speech read out the color
  }

  render() {
    return (
      <>
      <AnimatedCircles color={this.props.cssColor} />
      <Text style={
        {
          fontSize: 30,
          position: 'absolute',
        }
      }>
        {this.props.text}
      </Text>
      </>
    );
  }

  on
}

const GCloudLoading = () => {
  return (
    <>
    <AnimatedCircles />
    <Image source={require('./assets/gcloud.png')} style={
              {
                width: 250/3.5,
                height: 201/3.5,
                position: 'absolute',
              }
            } />
    </>
  );
};

const Overlay = (props: {
  isLoading?: boolean
}) => {
  return (
    <View style={styles.overlay}>
      {/*
       Header with the title of the app
      */}
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={
            {
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 3,
              height: 100,
            }
          }>

            {props.isLoading ? <GCloudLoading /> : <ColorDisplay text='Red' cssColor='red' />}

          </View>
        </View>
    </View>
  );
};

const CrosshairSVG = () => {
  <Svg width="199" height="199" viewBox="0 0 199 199" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Mask id="mask0_3_32" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-24" y="0" width="246" height="199">
  <Path d="M39 0H156V94H39V0Z" fill="#D9D9D9"/>
  <Path d="M-24 47H93V141H-24V47Z" fill="#D9D9D9"/>
  <Path d="M105 47H222V141H105V47Z" fill="#D9D9D9"/>
  <Path d="M62 105H179V199H62V105Z" fill="#D9D9D9"/>
  </Mask>
  <G mask="url(#mask0_3_32)">
  <Path d="M97.08 14H100.5V185H97.08V14Z" fill="#E8ED00"/>
  <Path d="M15 101.21L15 97.79L186 97.79V101.21L15 101.21Z" fill="#E8ED00"/>
  </G>
</Svg>
}

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = React.useRef<Camera>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [detectedColor, setDetectedColor] = useState<string | null>("Red");
  const isLoading = false;

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
      setCurrentPhoto(compressedImage as string);
      Vibration.vibrate(10);
    }
  }

  // useEffect(() => {
  //   takePicture();
  // }, [currentPhoto]);

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

  return (
    <View style={styles.container}>

      <Overlay isLoading={isLoading} />

      <Camera style={
        styles.camera
      } type={type}
        ref={camera}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={takePicture}>
            <CrosshairSVG/>



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
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay2: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  }
});
