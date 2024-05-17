import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface OptionArray {
  options: string[];
}

function RadioGroup(props: OptionArray) {
  const { options } = props;
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleRadioButtonPress = (value:any) => {
    setSelectedValue(value);
    console.log(`${value} selected`);
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>Choose an option:</Text>
      <RadioButton.Group
        onValueChange={(value) => handleRadioButtonPress(value)}
        value={selectedValue}
      >
        {options.map((option, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <RadioButton value={option} color="blue" />
            <Text>{option}</Text>
          </View>
        ))}
      </RadioButton.Group>
      <Text>Selected Value: {selectedValue}</Text>
    </View>
  );
}

export default RadioGroup;
