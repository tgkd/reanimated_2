import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import withDecay from './withDecay';

export default function GestureExample() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (e, ctx) => {
      translateX.value = ctx.offsetX + e.translationX;
      translateY.value = ctx.offsetY + e.translationY;
    },
    onEnd: (e, ctx) => {
      translateX.value = withDecay(e.velocityX < 0 ? 0 : width - CARD_WIDTH, {
        velocity: e.velocityX,
      });
      translateY.value = withDecay(e.velocityY < 0 ? 0 : height - CARD_HEIGHT, {
        velocity: e.velocityY,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedStyle}>
          <Card />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const Card = () => {
  return (
    <View style={styles.card}>
      <Text>{'YET ANOTHER ANIMATION'}</Text>
    </View>
  );
};

const { height, width } = Dimensions.get('window');
const CARD_HEIGHT = 120;
const CARD_WIDTH = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
  },

  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: 'coral',
    borderRadius: 24,
  },
});
