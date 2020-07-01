import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ExpandingBottom = ({height, navigation}) => {
  const ContainerYPosition = useSharedValue(height);
  const BottomYPosition = useSharedValue(80);

  const screenHeight = useSharedValue(height);

  useEffect(() => {
    navigation.addListener('focus', () => {
      BottomYPosition.value = 80;
    });
  }, [navigation, BottomYPosition]);

  const touchWithinBoundaries = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetY = BottomYPosition.value;
      if (event.absoluteY > screenHeight.value - 80) {
        touchWithinBoundaries.value = true;
      }
    },
    onActive: (event, ctx) => {
      if (touchWithinBoundaries.value) {
        BottomYPosition.value = ctx.offsetY - event.translationY;
      }
    },
    onEnd: () => {
      if (BottomYPosition.value < Math.round(screenHeight.value / 2)) {
        BottomYPosition.value = withSpring(80);
      }

      if (BottomYPosition.value >= Math.round(screenHeight.value / 2)) {
        BottomYPosition.value = withSpring(screenHeight.value);
        setTimeout(() => {
          navigation.navigate('Card');
        }, 500);
        BottomYPosition.value = withSpring(80);
      }

      touchWithinBoundaries.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: ContainerYPosition.value,
    };
  });

  const bottomAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: BottomYPosition.value,
    };
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedStyle}>
          <Animated.View style={[styles.card, bottomAnimatedStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'blue',
  },
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // height: 60,
    backgroundColor: 'red',
  },
});

export default ExpandingBottom;
