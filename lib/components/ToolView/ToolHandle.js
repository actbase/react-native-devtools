import { __assign } from "tslib";
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import ASGesutreResponder from '../useASGesutreResponder';
var HandleWidth = 20;
var HandleHeight = 40;
var styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -HandleHeight / 2,
    height: HandleHeight,
    width: HandleWidth,
    zIndex: 2,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  handleRight: {
    right: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  handleLeft: {
    left: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  handleBar: {
    height: HandleHeight - 20,
    width: 3,
    borderRadius: 3 / 2,
    backgroundColor: '#000'
  }
});

var ToolHandle = function (_a) {
  var isRight = _a.isRight,
      onPress = _a.onPress,
      backgroundColor = _a.backgroundColor,
      translateX = _a.translateX;
  var handle = ASGesutreResponder({
    key: 'Handle',
    initialValue: {
      x: 0,
      y: 0
    },
    onPress: onPress
  });
  return React.createElement(Animated.View, __assign({
    style: [styles.handle, isRight ? styles.handleRight : styles.handleLeft, {
      transform: [{
        translateY: handle.pan.y
      }, {
        translateX: translateX
      }]
    }, {
      backgroundColor: backgroundColor
    }]
  }, handle.responder), React.createElement(View, {
    style: styles.handleBar
  }), React.createElement(View, {
    style: styles.handleBar
  }));
};

export default ToolHandle;