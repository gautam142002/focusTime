import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../utils/colors';
import {RoundedButton} from '../components/RoundedButton';
import {spacing} from '../utils/sizes'

export const Focus = ({addSubject}) => {
  const[userInput, setUserInput] = useState('')
  return(
    <View style = {styles.container}>
      <View style = {styles.inputContainer}>
        <TextInput style = {styles.textInput}
          label = 'What would you like to focus on?'
          onChangeText = {setUserInput}
        />
        <View style = {styles.button}>
          <RoundedButton 
            title = '+'
            size = {50}
            onPress = {() => addSubject(userInput)}
          />
        </View>
      </View>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
   
  },
  textInput: {
    flex: 1,
    marginEnd: spacing.sm
  },

  button: {
    justifyContent: 'center'
  },

  inputContainer: {
    padding: spacing.md,
    flexDirection: 'row'
  },
})



