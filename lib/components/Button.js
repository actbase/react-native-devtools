import { __assign, __rest } from "tslib";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    borderRadius: 3,
    minHeight: 25,
    minWidth: 25,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 12,
    color: 'white'
  }
});

var Button = function (_a) {
  var style = _a.style,
      children = _a.children,
      textStyle = _a.textStyle,
      onPress = _a.onPress,
      etcProps = __rest(_a, ["style", "children", "textStyle", "onPress"]);

  var content = React.useMemo(function () {
    if (typeof children === 'string') {
      return React.createElement(Text, {
        style: textStyle ? [styles.textStyle, textStyle] : styles.textStyle
      }, children);
    } else {}
  }, [children]);
  return React.createElement(TouchableOpacity, __assign({
    style: style ? [styles.container, style] : styles.container,
    onPress: onPress
  }, etcProps), content);
};

export default Button;