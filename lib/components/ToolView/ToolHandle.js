import { __assign } from "tslib";
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import ASGesutreResponder from '../useASGesutreResponder'; // const HandleWidth = 20;

var HandleHeight = 35;
var styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -HandleHeight / 2,
    height: HandleHeight,
    width: 15,
    zIndex: Number.MAX_SAFE_INTEGER - 1,
    overflow: 'hidden'
  },
  handleRight: {
    right: 0
  },
  handleLeft: {
    left: 0
  },
  handleInner: {
    width: HandleHeight,
    height: HandleHeight,
    borderRadius: HandleHeight / 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  handleInnerRight: {
    paddingRight: 21.5,
    paddingLeft: 7
  },
  handleInnerLeft: {
    paddingLeft: 21.5,
    paddingRight: 7
  },
  handleBar: {
    height: 13,
    width: 2,
    borderRadius: 1,
    backgroundColor: '#eaeaea'
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
    },,]
  }, handle.responder), React.createElement(View, {
    style: [styles.handleInner, isRight ? styles.handleInnerRight : styles.handleInnerLeft, {
      backgroundColor: backgroundColor
    }, {
      backgroundColor: 'white'
    }]
  }, React.createElement(View, {
    style: styles.handleBar
  }), React.createElement(View, {
    style: styles.handleBar
  })));
};

export default ToolHandle;