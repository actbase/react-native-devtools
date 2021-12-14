import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Animated, Easing } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBar: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#333',
  },
});

const TransformerButton = ({ onPress, isClose }: { onPress: Function, isClose: boolean }) => {
  const animated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animated, {
      toValue: isClose ? 0 : 1,
      duration: 600,
      easing: Easing.elastic(3),
      useNativeDriver: false,
    }).start();
  }, [isClose]);

  const width = animated.interpolate({ inputRange: [0, 1], outputRange: [15, 9] });
  const rotate1 = animated.interpolate({ inputRange: [0, 1], outputRange: ['45deg', '-45deg'] });
  const rotate2 = animated.interpolate({ inputRange: [0, 1], outputRange: ['-45deg', '45deg'] });
  const translateX1 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });
  const translateX2 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });
  const translateY1 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, -2] });
  const translateY2 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });

  return (
    <TouchableOpacity
      hitSlop={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}
      style={[styles.button]}
      onPress={() => {
        onPress();
      }}
    >
      <Animated.View
        style={[
          styles.buttonBar,
          {
            width,
            transform: [
              { rotate: rotate1 },
              { translateX: translateX1 },
              { translateY: translateY1 }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.buttonBar,
          {
            width,
            transform: [{ rotate: rotate2 }, { translateX: translateX2 }, { translateY: translateY2 }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default TransformerButton;