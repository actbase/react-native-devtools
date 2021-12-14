import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
var styles = StyleSheet.create({
  tool: {
    borderLeftColor: '#eee',
    borderLeftWidth: 5,
    paddingLeft: 11,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fafafa'
  },
  toolSection: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
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