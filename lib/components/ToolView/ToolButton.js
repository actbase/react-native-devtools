import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
var styles = StyleSheet.create({
  tool: {
    height: 44,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  toolNoLine: {
    borderBottomWidth: 0
  },
  toolCaption: {
    color: 'white'
  }
});

var ToolButton = function (_a) {
  var children = _a.children,
      onPress = _a.onPress,
      isLast = _a.isLast,
      renderBeforeChildren = _a.renderBeforeChildren,
      renderAfterChildren = _a.renderAfterChildren;
  return React.createElement(TouchableOpacity, {
    style: isLast ? [styles.tool, styles.toolNoLine] : styles.tool,
    onPress: onPress
  }, renderBeforeChildren === null || renderBeforeChildren === void 0 ? void 0 : renderBeforeChildren(), !!children && React.createElement(Text, {
    allowFontScaling: false,
    style: styles.toolCaption
  }, children), renderAfterChildren === null || renderAfterChildren === void 0 ? void 0 : renderAfterChildren());
};

export default ToolButton;