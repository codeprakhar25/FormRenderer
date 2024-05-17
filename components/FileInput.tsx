import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import { XMLParser } from 'fast-xml-parser';
import * as FileSystem from 'expo-file-system';

const FileInput = () => {
  const parser = new XMLParser()
  const uploadFileOnPressHandler = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result?.canceled) {
        alert('Cancelled')
      }
      alert(result?.assets);
      if (result?.assets) {
        const fileContents = await FileSystem.readAsStringAsync(result?.assets[0]?.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        })
        const data = parser.parse(fileContents)
        console.log("main", data)
      }
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