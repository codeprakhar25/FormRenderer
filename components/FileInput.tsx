import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import * as DocumentPicker from "expo-document-picker";
import { XMLParser } from 'fast-xml-parser';
import * as FileSystem from 'expo-file-system';
import { Chip, TextInput } from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { ThemedText } from './ThemedText';
import Drawing from './Drawing';
import RadioGroup from './RadioButton';

const FileInput = () => {
  // init
  const parser = new XMLParser()

  // states
  const [finaldata, setFinalData] = useState<any>(null)
  const [customer, setCustomer] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isshow, setIsShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const uploadFileOnPressHandler = async () => {
    setLoading(true)
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result?.canceled) {
        setLoading(false)
        return Alert.alert('Please select a file')
      }
      if (result?.assets) {
        if (result?.assets[0]?.mimeType === 'text/xml') {
          const fileContents = await FileSystem.readAsStringAsync(result?.assets[0]?.uri, {
            encoding: FileSystem.EncodingType.UTF8,
          })
          const data = parser.parse(fileContents)
          console.log("main", data)
          if (data?.svg?.svg?.g[1] && data?.svg?.svg?.g[1]?.text) {
            setFinalData(data.svg.svg.g[1]);
            setLoading(false)
          } else {
            Alert.alert('Invalid XML Format(Please input in the format defined)')
            setLoading(false)
          }
        } else {
          setLoading(false)
          Alert.alert('Please input a XML file to render')
        }
      }
      console.log(finaldata);
    } catch (err) {
      console.log(err);
      setLoading(false)

      throw err;
    }
  };

  const handleDateChange = (event: any, date: any) => {
    const selected = date || selectedDate
    setSelectedDate(selected)
    setIsShow(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <Button disabled={loading} onPress={async () => {
        uploadFileOnPressHandler();
      }} mode='contained'>{loading ? <ActivityIndicator /> : <Text>Render Form from XML Input</Text>}</Button>
      <Text style={{ marginVertical: 10 }}>Should only contain following fields:</Text>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <Chip icon="information">Text field</Chip>
        <Chip icon="information" style={{ marginLeft: 65 }}>Date/time field</Chip>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <Chip icon="information">Radio buttons</Chip>
        <Chip icon="information" style={{ marginLeft: 40 }}>Drawing field</Chip>
      </View>
      {finaldata && (
        <>
          {
            finaldata.text.map((e: any, idx: any) => {
              return (
                <>
                  {
                    e === 'Signature'
                      ? <><ThemedText>
                        {finaldata?.text[3]}
                      </ThemedText><Drawing /></> : e === 'Date' ?
                        <><ThemedText>{e}</ThemedText>
                          <TextInput mode='outlined' label={e} onPress={() => setIsShow(!isshow)} value={selectedDate.toDateString()} />
                          {isshow && <RNDateTimePicker value={selectedDate} onChange={handleDateChange} />}</> :
                        <><ThemedText>{e}</ThemedText>
                          <TextInput value={customer} onChangeText={(text) => { setCustomer(text) }} mode='outlined' label={e} right={<TextInput.Affix text={finaldata?.g[idx]?.rect?.length} />} error={customer.length > 20 && true} /></>
                  }
                </>
              )
            })
          }
          <RadioGroup options={[finaldata?.g[5]?.text?.tspan?.tspan?.tspan.tspan?.tspan, finaldata?.g[7]?.text?.tspan?.tspan?.tspan.tspan?.tspan]} />
        </>
      )}
    </View>
  );
};

export default FileInput;