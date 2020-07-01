import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

// import  from '../../../components/Button';
import ReText from '../../../components/AnimatedHelpers/ReText';

import {runOnUI, useSharedValue} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
const sayHello = (text, from) => {
  'worklet';
  text.value = `Jesus cristo, dai-me paciencia ${from}`;
};

const Worklets = () => {
  const text = useSharedValue('');
  return (
    <View style={styles.container}>
      <ReText text={text} color="black" />
      <Button title="olá" onPress={() => runOnUI(sayHello)(text, 'Brazil')} />
      {/* <Button
        label="say Hello"
        primary
        onPress={() => runOnUi(sayHello)(text, 'Dai de cima')}
      /> */}
    </View>
  );
};

export default Worklets;
