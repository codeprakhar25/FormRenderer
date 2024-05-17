import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as DocumentPicker from "expo-document-picker";

const FileInput = () => {

  const uploadFileOnPressHandler = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result?.canceled) {
        alert('Cancelled')
      }
      alert(result?.assets);

      console.log(result);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Pick File" onPress={async () => {
        uploadFileOnPressHandler();
      }} />
    </View>
  );
};

export default FileInput;