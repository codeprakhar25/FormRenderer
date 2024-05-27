import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import FileInput from '@/components/FileInput';
import LocalNotification from '@/components/Notification';

export default function TabTwoScreen() {

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#ffffff', dark: '#353636' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Try it</ThemedText>
      </ThemedView>
      <Text> Push Notification!! </Text>
      <Button title={'Click Here'} onPress={LocalNotification} />
      <FileInput />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
