import React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToolHandle from './ToolHandle';
import ToolContent from './ToolContent';
import { PositionRight } from '../../commons/defines';
var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0
  },
  containerRight: {
    right: 0
  },
  containerLeft: {
    left: 0
  }
});

var ToolView = function (_a) {
  var _b = _a.extensions,
      extensions = _b === void 0 ? [] : _b;

  var _c = React.useState(false),
      isShow = _c[0],
      setIsShow = _c[1]; // const [isShowContent, setIsShowContent] = React.useState(false);


  var _d = React.useState(0x40),
      opacity = _d[0],
      setOpacity = _d[1];

  var _e = React.useState(PositionRight),
      position = _e[0],
      setPosition = _e[1];

  var backgroundColor = "#000000" + opacity.toString(16);
  var width = Dimensions.get('window').width / 2;
  var appearAnimated = React.useRef(new Animated.Value(0)).current;
  var isRight = position === PositionRight;
  var translateX = appearAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: isRight ? [0, -width] : [0, width]
  });

  var handleTouch = function () {
    return setIsShow(!isShow);
  };

  React.useEffect(function () {
    // if (isShow) setIsShowContent(true);
    Animated.timing(appearAnimated, {
      toValue: isShow ? 1 : 0,
      duration: 500,
      useNativeDriver: false
    }).start(function () {// if (!isShow) setIsShowContent(false);
    });
  }, [isShow]);
  React.useEffect(function () {
    return setOpacity(0x80);
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
    style: [styles.container, isRight ? {
      right: -width
    } : {
      left: -width
    }, {
      width: width,
      transform: [{
        translateX: translateX
      }],
      zIndex: Number.MAX_SAFE_INTEGER - 1
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