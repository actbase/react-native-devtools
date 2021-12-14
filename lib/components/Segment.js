import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
var styles = StyleSheet.create({
  segment: {
    height: 35,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: 35 / 2,
    backgroundColor: '#eee',
    overflow: 'hidden'
  },
  element: {
    flex: 1,
    justifyContent: 'center'
  },
  elementSelected: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center'
  },
  text: {
    fontSize: 8,
    color: '#999',
    textAlign: 'center'
  },
  textSelected: {
    fontSize: 8,
    color: '#fff',
    textAlign: 'center'
  }
});

var Segment = function (_a) {
  var items = _a.items,
      onPress = _a.onPress,
      value = _a.value;
  return React.createElement(View, {
    style: styles.segment
  }, items.map(function (item, index) {
    var _a, _b;

    var isSelected = item.value === value || item === value;
    return React.createElement(TouchableOpacity, {
      style: isSelected ? styles.elementSelected : styles.element,
      key: index,
      onPress: function () {
        return onPress(item);
      }
    }, React.createElement(Text, {
      allowFontScaling: false,
      style: isSelected ? styles.textSelected : styles.text
    }, (_b = (_a = item === null || item === void 0 ? void 0 : item.label) === null || _a === void 0 ? void 0 : _a.toUpperCase) === null || _b === void 0 ? void 0 : _b.call(_a)));
  }));
};

export default Segment;