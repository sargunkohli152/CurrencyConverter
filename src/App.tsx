import React, { useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

//constants
import { currencyByRupee } from './constants';

//Component
import CurrencyButton from './components/CurrencyButton';

const App = (): JSX.Element => {

  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if(!inputValue){  
      return Toast.show({
        type: 'error',
        text1: 'No Input Value',
        text2: 'Kindly fill all the necessary fields'
      });
    }

    const inputAmount = parseFloat(inputValue);
    if(!isNaN(inputAmount)){
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    }
    else{
      console.log("not a valid number");
      return ToastAndroid.show(
        `Not a valid number`,
        ToastAndroid.CENTER
      );
    }
  }

  return (
    <>

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <View>
              <TextInput 
              style={styles.inputContainer}
              maxLength={14}
              value={inputValue}
              clearButtonMode='always' //only for android
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in Rupees'
              />
            </View>
          </View>
          {resultValue && (
            <Text style={styles.resultTxt}>{resultValue}</Text>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <FlatList 
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <TouchableOpacity style={[
              styles.button,
              targetCurrency === item.name && styles.selected
              ]}
              onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item}/>
            </TouchableOpacity>
          )}
          />
        </View>
      </View>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderRadius: 6,
    height: 40,
    fontWeight: '400'
  },
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#6BABFB',
  },
});

export default App;
