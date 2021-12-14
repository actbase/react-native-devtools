import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
var styles = StyleSheet.create({
  tool: {
    height: 44,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  toolEven: {
    backgroundColor: '#fafafa'
  },
  toolCaption: {
    flex: 1,
    fontSize: 10,
    letterSpacing: -0.4,
    color: '#666'
  }
});

var ToolButton = function (_a) {
  var children = _a.children,
      even = _a.even,
      onPress = _a.onPress,
      renderBeforeChildren = _a.renderBeforeChildren,
      renderAfterChildren = _a.renderAfterChildren;
  return React.createElement(TouchableOpacity, {
    style: [styles.tool, even && styles.toolEven],
    onPress: onPress
  }, renderBeforeChildren === null || renderBeforeChildren === void 0 ? void 0 : renderBeforeChildren(), !!children && React.createElement(Text, {
    allowFontScaling: false,
    style: styles.toolCaption
  }, children), renderAfterChildren === null || renderAfterChildren === void 0 ? void 0 : renderAfterChildren());
};

export default ToolButton;