import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Button from './components/Button';
import Display from './components/Display';

export default () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operator, setOperator] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  function addDigit(digit) {
    const _clearDisplay = displayValue === '0' || clearDisplay;

    if (digit === '.' && _clearDisplay && displayValue.includes('.')) {
      return;
    }

    const currentValue = _clearDisplay ? '' : displayValue;
    const _displayValue = currentValue + digit;
    setDisplayValue(_displayValue);
    setClearDisplay(false);

    if (digit !== '.') {
      const newValue = parseFloat(_displayValue);
      const _values = [...values];
      _values[current] = newValue;
      setValues(_values);
    }
  }

  function clearMemory() {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperator(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  function setOperation(operation) {
    if (current === 0) {
      setOperator(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation === '=';
      const _values = [...values];
      try {
        // eslint-disable-next-line no-eval
        _values[0] = eval(`${_values[0]} ${operator} ${_values[1]}`);
      } catch (e) {
        _values[0] = values[0];
      }

      _values[1] = 0;
      setDisplayValue(`${_values[0]}`);
      setOperator(equals ? null : operation);
      setCurrent(equals ? 0 : 1);
      //   setClearDisplay(!equals);
      setClearDisplay(true);
      setValues(_values);
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.button}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
