import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Animated, Easing } from 'react-native';
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBar: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#333'
  }
});

var TransformerButton = function (_a) {
  var onPress = _a.onPress,
      isClose = _a.isClose;
  var animated = React.useRef(new Animated.Value(0)).current;
  React.useEffect(function () {
    Animated.timing(animated, {
      toValue: isClose ? 0 : 1,
      duration: 600,
      easing: Easing.elastic(3),
      useNativeDriver: false
    }).start();
  }, [isClose]);
  var width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 9]
  });
  var rotate1 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '-45deg']
  });
  var rotate2 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '45deg']
  });
  var translateX1 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2]
  });
  var translateX2 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2]
  });
  var translateY1 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2]
  });
  var translateY2 = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2]
  });
  return React.createElement(TouchableOpacity, {
    hitSlop: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    },
    style: [styles.button],
    onPress: function () {
      onPress();
    }
  }, React.createElement(Animated.View, {
    style: [styles.buttonBar, {
      width: width,
      transform: [{
        rotate: rotate1
      }, {
        translateX: translateX1
      }, {
        translateY: translateY1
      }]
    }]
  }), React.createElement(Animated.View, {
    style: [styles.buttonBar, {
      width: width,
      transform: [{
        rotate: rotate2
      }, {
        translateX: translateX2
      }, {
        translateY: translateY2
      }]
    }]
  }));
};

export default TransformerButton;