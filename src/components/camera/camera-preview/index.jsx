import React from 'react';
import { View, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  return (
    <View style={{ height: '100%', paddingTop: '40%' }}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={{ height: '85%' }} />
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
        <IconButton icon="camera" size={20} onPress={retakePicture} />
        <IconButton icon="upload" size={20} onPress={() => savePhoto(photo)} />
      </View>
    </View>
  );
};

export default CameraPreview;
