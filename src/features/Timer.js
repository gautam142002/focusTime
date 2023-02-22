import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration} from 'react-native';
import { ProgressBar } from 'react-native-paper'
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../utils/colors';
import { Countdown } from '../components/countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];



export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1)
  const [minutes, setMinutes] = useState(0.1)

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes = {minutes}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <Text style={styles.title}>
          Focusing on : <Text style={styles.task}>{focusSubject}</Text>
        </Text>
      </View>
      <View>
        <ProgressBar 
          progress = {progress}
          color = {colors.progressBar}
          style = {{height: spacing.sm}}
        />
      </View>
      <View style = {styles.timeWrapper}>
        <View style = {styles.timingButton}>
          <RoundedButton title="10"  size={75}  onPress={() => {setMinutes(10)}} />
        </View>
        <View style = {styles.timingButton}>
          <RoundedButton title="15"  size={75}  onPress={() => {setMinutes(15)}} />
        </View>
        <View style = {styles.timingButton}>
          <RoundedButton title="20"  size={75}  onPress={() => {setMinutes(20)}} />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="Pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style = {styles.clearTimeWrapper}>
        <RoundedButton 
          title="Clear"
          size = {75}
          onPress={clearSubject}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  clearTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    justifyContent: 'center',
    paddingTop: spacing.xxl,
    fontWeight: 'bold',
  },
  task: {
    color: colors.white,
    fontWeight: 'normal',
  },
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
  timeWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
});
