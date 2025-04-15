// src/components/ImagePickerButton.tsx
import React from "react";
import { Alert, View, Button, StyleSheet } from "react-native";
import { launchCamera, launchImageLibrary, Asset, ImagePickerResponse } from "react-native-image-picker";

type Props = {
  onImageSelected: (image: Asset) => void;
};

export const ImagePickerButton: React.FC<Props> = ({ onImageSelected }) => {
  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log("Usuario canceló la acción");
    } else if (response.errorCode) {
      Alert.alert("Error", response.errorMessage || "Ocurrió un error");
    } else if (response.assets && response.assets.length > 0) {
      onImageSelected(response.assets[0]);
    }
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: "photo",
        cameraType: "back",
        saveToPhotos: true,
      },
      handleResponse
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
      },
      handleResponse
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir Cámara" onPress={openCamera} />
      <View style={{ marginVertical: 8 }} />
      <Button title="Seleccionar de Galería" onPress={openGallery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
});
