import { useState } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-paper'
import { XMLParser } from 'fast-xml-parser'
import { TextInput } from 'react-native-paper'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Drawing from '@/components/Drawing'
import { dataxml } from '@/assets/task'
import RadioGroup from '@/components/RadioButton'
import RNDateTimePicker from '@react-native-community/datetimepicker'

export default function HomeScreen() {
  // init
  const parser = new XMLParser()

  // states
  const [data, setData] = useState<any>(null)
  const [customer, setCustomer] = useState('')
  const [forename, setForeName] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isshow, setIsShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const parseData = () => {
    setLoading(true)
    const text = parser.parse(dataxml)
    setData(text.svg.svg.g[1])
    setLoading(false)
  }

  const handleDateChange = (event: any, date: any) => {
    const selected = date || selectedDate
    setSelectedDate(selected)
    setIsShow(false)
  }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#ffffff', dark: '#1D3D47' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Try it</ThemedText>
      </ThemedView>
      <Button onPress={parseData} mode='contained'>Render Form from XML File</Button>
      {loading && <ActivityIndicator size={'large'} color={'blue'} />}
      {data && (
        <>
          <ThemedText>{data?.text[0]}</ThemedText>
          <TextInput value={customer} onChangeText={(text) => { setCustomer(text) }} mode='outlined' label={data?.text[0]} right={<TextInput.Affix text={data?.g[0]?.rect?.length} />} error={customer.length > 20 && true} />
          <ThemedText>{data?.text[1]}</ThemedText>
          <TextInput value={forename} onChangeText={(text) => { setForeName(text) }} mode='outlined' label={data?.text[1]} right={<TextInput.Affix text={data?.g[1]?.rect?.length} />} error={forename.length > 20 && true} />
          <ThemedText>{data?.text[2]}</ThemedText>
          <TextInput mode='outlined' label={data?.text[2]} onPress={() => setIsShow(!isshow)} value={selectedDate.toDateString()} />
          {isshow && <RNDateTimePicker value={selectedDate} onChange={handleDateChange} />}
          <ThemedText>
            {data?.text[3]}
          </ThemedText>
          <Drawing />
          <RadioGroup options={[data?.g[5]?.text?.tspan?.tspan?.tspan.tspan?.tspan, data?.g[7]?.text?.tspan?.tspan?.tspan.tspan?.tspan]} />
        </>
      )}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
