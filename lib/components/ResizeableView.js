import { __assign } from "tslib";
import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import ASGesutreResponder from './useASGesutreResponder';
import TransformerButton from './TransformerButton';
var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    minWidth: 200,
    minHeight: 100,
    shadowOffset: {
      width: -2,
      height: 0
    },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 10
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff99',
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden'
  },
  topView: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa'
  },
  title: {
    color: '#666',
    fontWeight: 'bold',
    letterSpacing: -0.5
  },
  resizeHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resizeHandleInner: {
    position: 'absolute',
    width: 15,
    height: 2,
    borderRadius: 1,
    transform: [{
      rotate: '-45deg'
    }, {
      translateY: -2.5
    }],
    backgroundColor: '#ccc'
  },
  resizeHandleInner2: {
    position: 'absolute',
    width: 15,
    height: 2,
    borderRadius: 1,
    transform: [{
      rotate: '-45deg'
    }, {
      translateY: 2.5
    }],
    backgroundColor: '#ccc'
  }
});

var ResizeableView = function (_a) {
  var title = _a.title,
      contentContainerStyle = _a.contentContainerStyle,
      children = _a.children,
      onClose = _a.onClose,
      renderHeaderExtra = _a.renderHeaderExtra,
      renderFooter = _a.renderFooter,
      _b = _a.isClose,
      isClose = _b === void 0 ? true : _b;
  var window = Dimensions.get('window');
  var move = ASGesutreResponder({
    key: title + "_move",
    initialValue: {
      x: 50,
      y: 50
    },
    max: {
      x: window.width - 80,
      y: window.height - 80
    },
    min: {
      x: -window.width / 2,
      y: -window.height / 2
    }
  });
  var resize = ASGesutreResponder({
    key: title + "_resize",
    initialValue: {
      x: 200,
      y: 200
    },
    max: {
      x: window.width,
      y: window.height
    },
    min: {
      x: 200,
      y: 100
    }
  });
  return React.createElement(Animated.View, {
    style: [styles.container, {
      transform: [{
        translateX: move.pan.x
      }, {
        translateY: move.pan.y
      }]
    }, {
      width: resize.pan.x,
      height: resize.pan.y
    }]
  }, React.createElement(View, {
    style: styles.innerContainer
  }, React.createElement(View, __assign({
    style: styles.topView
  }, move.responder), React.createElement(TransformerButton, {
    onPress: function () {
      return onClose === null || onClose === void 0 ? void 0 : onClose();
    },
    isClose: isClose
  }), React.createElement(View, {
    style: {
      flex: 1,
      justifyContent: 'center'
    }
  }, React.createElement(Text, {
    style: styles.title
  }, title)), renderHeaderExtra === null || renderHeaderExtra === void 0 ? void 0 : renderHeaderExtra()), React.createElement(View, {
    style: [{
      flex: 1
    }, contentContainerStyle]
  }, children), React.createElement(View, __assign({
    style: styles.topView
  }, move.responder), renderFooter === null || renderFooter === void 0 ? void 0 : renderFooter()), React.createElement(View, __assign({
    style: styles.resizeHandle
  }, resize.responder), React.createElement(View, {
    style: styles.resizeHandleInner
  }), React.createElement(View, {
    style: styles.resizeHandleInner2
  }))));
};

export default ResizeableView;