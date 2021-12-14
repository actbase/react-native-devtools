import React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToolButton from './ToolHandle';
import ToolHandle from './ToolHandle';
import ToolContent from './ToolContent';
import { PositionRight } from '../../commons/defines';
var styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    shadowOffset: {
      width: -2,
      height: -2
    },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2
  },
  contentRight: {
    right: 0
  },
  contentLeft: {
    left: 0
  }
});

var ToolView = function (_a) {
  var _b = _a.extensions,
      extensions = _b === void 0 ? [] : _b,
      isOpen = _a.isOpen,
      onChangeOpen = _a.onChangeOpen; // const [isShowContent, setIsShowContent] = React.useState(false);

  var _c = React.useState(0x40),
      opacity = _c[0],
      setOpacity = _c[1];

  var _d = React.useState(PositionRight),
      position = _d[0],
      setPosition = _d[1];

  var _e = React.useState(0),
      shadowOpacity = _e[0],
      setShadowOpacity = _e[1];

  var backgroundColor = "#fafafa" + opacity.toString(16);
  var width = Dimensions.get('window').width / 2;
  var appearAnimated = React.useRef(new Animated.Value(0)).current;
  var isRight = position === PositionRight;
  var translateX = appearAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: isRight ? [0, -width] : [0, width]
  });

  var handleTouch = function () {
    onChangeOpen(!isOpen);
  };

  React.useEffect(function () {
    // if (isShow) setIsShowContent(true);
    if (isOpen) setShadowOpacity(0.2);
    Animated.timing(appearAnimated, {
      toValue: isOpen ? 1 : 0,
      duration: 500,
      useNativeDriver: false
    }).start(function () {
      // if (!isShow) setIsShowContent(false);
      if (!isOpen) setShadowOpacity(0);
    });
  }, [isOpen]);
  React.useEffect(function () {
    setOpacity(0xFF);
  }, []);
  return React.createElement(React.Fragment, null, React.createElement(ToolHandle, {
    isRight: isRight,
    onPress: handleTouch,
    backgroundColor: backgroundColor,
    translateX: appearAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: isRight ? [0, -width] : [0, width]
    })
  }), React.createElement(Animated.View, {
    style: [styles.content, isRight ? {
      right: -width
    } : {
      left: -width
    }, {
      width: width,
      transform: [{
        translateX: translateX
      }],
      zIndex: Number.MAX_SAFE_INTEGER - 2,
      shadowOpacity: shadowOpacity
    }]
  }, React.createElement(SafeAreaProvider, {
    style: {
      flex: 1
    }
  }, React.createElement(ToolContent, {
    backgroundColor: backgroundColor,
    setPosition: setPosition,
    position: position,
    toggleTool: function () {
      handleTouch();
    },
    extensions: extensions
  }))));
};

export default ToolView;
export { ToolButton };