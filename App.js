// Author: WANG Zhao Matthew
// Data 2022.05.06

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

export default function App() {
  
  // Set up the State Hook
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  // Define the buttons 
  const buttons = ['Clr', 'Del', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']
  const operators = ['/', '+', '-', '*']

  // Calculate
  function calculate() {
    console.log('====================================');
    console.log((currentNumber).toString());
    console.log('====================================');

    // LastChar for checking whether the last character is an operator.
    let lastChar = currentNumber[currentNumber.length-1];
    
    if(operators.includes(lastChar)) {
      // If the last character is an operator, we set the current number in the displaying box
      setCurrentNumber(currentNumber)
      return
    }
    else {
      // If the last character is an number, we envaluate it, and set the result in the displaying box
      let result = eval(currentNumber).toString();
      setCurrentNumber(result)
      return
    }
  }

  // Handling the input
  function handleInput(beingPressed) {

    if(operators.includes(beingPressed)) { 
      setCurrentNumber(currentNumber + beingPressed)
      return
    }
    else if (beingPressed === '.' || isNaN(beingPressed) === false) {
    }
    switch(beingPressed) {
      case 'Del':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'Clr':
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        setLastNumber(currentNumber + '=')
        calculate()
        return
    }
    setCurrentNumber(currentNumber + beingPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#384c7d',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: '#6d72a1',
      fontSize: 20,
      marginRight: 10,
      marginTop: 20,
      alignSelf: 'flex-end',
    },
    declareText: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: '#d2d2d2',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      borderRadius: 25,
      opacity: 0.3,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: '#d2d2d2',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '54%',
      flex: 2,
    },
    textButton: {
      color: '#6d72a1',
      fontSize: 28,
    }
  })

  return(
    <View>
      <View style={styles.results}>

        <Text style={styles.declareText}>Author: WANG Zhao</Text>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
       
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#384c7d'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ?  '#fff' : '#ededed', minWidth: '36%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === '.' || button === 'Del' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: button === '.' ? '#fff' : '#ededed', minWidth: '37%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === 'Clr' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? '#fff' : '#ededed', minWidth: '36%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? '#fff' : '#ededed' } ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}