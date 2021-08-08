import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
var styles = StyleSheet.create({
  tool: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  toolSection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  }
});

var ToolButton = function (_a) {
  var title = _a.title,
      renderBeforeChildren = _a.renderBeforeChildren,
      renderAfterChildren = _a.renderAfterChildren;
  return React.createElement(View, {
    style: styles.tool
  }, renderBeforeChildren === null || renderBeforeChildren === void 0 ? void 0 : renderBeforeChildren(), !!title && React.createElement(Text, {
    allowFontScaling: false,
    style: styles.toolSection
  }, title), renderAfterChildren === null || renderAfterChildren === void 0 ? void 0 : renderAfterChildren());
};

export default ToolButton;