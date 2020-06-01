import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

export default function ScrollExample() {
  const translateY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const size = isScrolling.value ? 80 : 40;
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
      width: withSpring(size),
      height: withSpring(size),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </View>
      <View style={styles.col}>
        <Animated.ScrollView
          style={styles.scroll}
          scrollEventThrottle={16}
          onScroll={scrollHandler}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <View key={idx} style={styles.placeholder} />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  box: {
    alignSelf: 'center',
    backgroundColor: '#ccc',
    borderRadius: 12,
  },
  placeholder: {
    width: 80,
    height: 80,
    backgroundColor: 'coral',
    marginVertical: 120,
    borderRadius: 12,
  },
});
