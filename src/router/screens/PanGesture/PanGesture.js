import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {PanGestureHandler} from 'react-native-gesture-handler';
import withDecay from '../../../components/WithDecay';

const PanGesture = ({width, height}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
    },
    // onEnd: (event, ctx) => {
    //   translateX.value = withDecay({
    //     velocity: event.velocityX,
    //     clamp: [0, width - 300],
    //   });
    //   translateY.value = withDecay({
    //     velocity: event.velocityY,
    //     clamp: [0, height - 160],
    //   });
    // },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},

        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedStyle}>
          <View style={styles.card} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 300,
    height: 160,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default PanGesture;
