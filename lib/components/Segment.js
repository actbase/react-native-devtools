import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
var styles = StyleSheet.create({
  segment: {
    height: 40,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    borderColor: '#66666688',
    borderWidth: 1
  },
  element: {
    flex: 1,
    justifyContent: 'center'
  },
  elementSelected: {
    flex: 1,
    backgroundColor: '#ffffff88',
    justifyContent: 'center',
    borderRadius: 10
  },
  text: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  textSelected: {
    fontSize: 12,
    color: 'black',
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
    }, item.label));
  }));
};

export default Segment;