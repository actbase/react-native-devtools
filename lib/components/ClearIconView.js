import React from 'react';
import { View } from 'react-native';

var ClearIconView = function (_a) {
  var _b = _a.color,
      color = _b === void 0 ? 'black' : _b;
  return React.createElement(View, {
    style: {
      width: 9,
      height: 9,
      borderBottomColor: color,
      borderBottomWidth: 0.5,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, React.createElement(View, {
    style: {
      width: 6,
      height: 7,
      borderRadius: 1.5,
      borderWidth: 0.5,
      borderColor: color,
      position: 'absolute',
      transform: [{
        translateX: 1
      }, {
        rotate: '45deg'
      }, {
        translateY: 1.5
      }]
    }
  }, React.createElement(View, {
    style: {
      width: 5,
      height: 0.75,
      backgroundColor: color,
      marginTop: 3.5
    }
  })));
};

export default ClearIconView;