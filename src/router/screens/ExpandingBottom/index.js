import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import ExpandingBottom from './ExpandingBottom';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Demo = props => {
  console.log('parent props', props);
  const [container, setContainer] = useState(null);
  return (
    <View
      style={styles.container}
      onLayout={({nativeEvent: {layout}}) => setContainer(layout)}>
      {container && (
        <ExpandingBottom {...container} navigation={props.navigation} />
      )}
    </View>
  );
};

export default Demo;
