import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Headline, IconButton, Text } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-paper-grid';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import NoImage from '../../../assets/noimage.jpg';

import MainContainer from '../../components/containers/main-container';
import CameraPreview from '../../components/camera/camera-preview';
import ApiService from '../../services/api-service';

let camera;

const ImagePage = () => {
  const [image, setImage] = useState({ name: 'No image', uri: '' });
  const [response, setResponse] = useState(null);
  // Camera stuff
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const upload = async (photo) => {
    const { data } = await ApiService.uploadImage(photo);
    setResponse(data);
  };

  // Image picker, duoda pasirinkti nuotrauka is visu failu telefe ir ikelia
  const pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!photo.cancelled) {
      const parts = photo.uri.split('/');
      const name = parts[parts.length - 1];
      setImage({ name, uri: photo.uri });
      upload(photo);
    }
  };

  // Startuoja kamera
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  // Fotografuoja
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync({ quality: 1, base64: true });
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  // Issaugo / ikelia fotke state
  const __savePhoto = (photo) => {
    const parts = photo.uri.split('/');
    const name = parts[parts.length - 1];
    setImage({ name, uri: photo.uri });
    setPreviewVisible(false);
    setStartCamera(false);
    upload(photo);
  };

  // Naujai fotkei
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  // Pasikeist kamera
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  // Kameros uzdarymas
  const __closeCamera = () => {
    setStartCamera(false);
  };

  return (
    <MainContainer>
      {startCamera ? (
        // Jei pasirnkta ijungti kamera ja atvaizduoja
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {previewVisible && capturedImage ? (
            // Nufotografavus parodo nuotrauka ir leidzia padaryti nauja arba uploadint
            <View style={{ height: '100%' }}>
              <CameraPreview
                photo={capturedImage}
                savePhoto={__savePhoto}
                retakePicture={__retakePicture}
                style={{}}
              />
            </View>
          ) : (
            <View style={{ height: '100%' }}>
              <View style={{ height: '60%', marginTop: '40%' }}>
                <Camera
                  type={cameraType}
                  style={{ flex: 1 }}
                  ref={(r) => {
                    camera = r;
                  }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between',
                }}
              >
                <IconButton icon="camera-front" size={20} onPress={__switchCamera} />
                <IconButton icon="camera" size={20} onPress={__takePicture} />
                <IconButton icon="close" size={20} onPress={__closeCamera} />
              </View>
            </View>
          )}
        </View>
      ) : (
        // Puslapio pagrindinis vaizdas
        <View>
          <Grid>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Headline>Skynet</Headline>
              </Col>
            </Row>
            <Row>
              <Col inline style={{ display: 'flex', justifyContent: 'center' }}>
                <Button icon="camera" mode="contained" onPress={() => __startCamera()}>
                  Photo
                </Button>
              </Col>
              <Col inline style={{ display: 'flex', justifyContent: 'center' }}>
                <Button icon="upload" mode="contained" onPress={() => pickImage()}>
                  Upload
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Headline>{image.name}</Headline>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  style={{ width: '100%', height: 350 }}
                  source={image.uri.length > 0 ? { uri: image.uri } : NoImage}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                {response ? <Text>{response}</Text> : <Text>No info</Text>}
              </Col>
            </Row>
          </Grid>
        </View>
      )}
    </MainContainer>
  );
};

export default ImagePage;
