import React from 'react';
import { View, Text, Linking, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToolContext } from '../../context/toolManager/ToolContext';
import { setEnableDevTool } from '../../context/devToolEmitter/devToolEmitter';
import ToolButton from './ToolButton';
import ToolSection from './ToolSection';
import DeviceInfoView from '../../tools/DeviceInfoView';
import { PositionLeft, PositionRight } from '../../commons/defines';

var RNRestart = require('react-native-restart')["default"];

var styles = StyleSheet.create({
  body: {
    flex: 1
  },
  header: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    // textAlign: 'center',
    letterSpacing: -0.6
  },
  company: {
    fontSize: 8,
    color: '#999',
    letterSpacing: -0.4
  },
  copyright: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actbase: {
    flex: 1,
    fontSize: 8,
    letterSpacing: -0.6,
    color: '#999'
  },
  contact: {
    fontSize: 8,
    letterSpacing: -0.4,
    color: '#333'
  },
  contactUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 1.5,
    height: 2.5,
    backgroundColor: 'rgb(143,205,175)',
    zIndex: -1
  }
});

var ToolContent = function (_a) {
  var position = _a.position,
      setPosition = _a.setPosition,
      backgroundColor = _a.backgroundColor,
      toggleTool = _a.toggleTool,
      extensions = _a.extensions;
  var inset = useSafeAreaInsets();

  var _b = React.useContext(ToolContext),
      _c = _b.axiosLog,
      _d = _c === void 0 ? [] : _c,
      isShowAxiosLog = _d[0],
      setShowAxiosLog = _d[1],
      _e = _b.asyncStorage,
      _f = _e === void 0 ? [] : _e,
      isShowAsyncStorage = _f[0],
      setShowAsyncStorage = _f[1],
      _g = _b.log,
      _h = _g === void 0 ? [] : _g,
      isShowLog = _h[0],
      setShowLog = _h[1];

  var isRight = position === PositionRight;
  return React.createElement(View, {
    style: [styles.body, {
      backgroundColor: backgroundColor
    }]
  }, React.createElement(TouchableOpacity, {
    activeOpacity: 1,
    style: [styles.header, {
      height: inset.top + 44,
      paddingTop: inset.top
    }],
    onPress: function () {
      setPosition(isRight ? PositionLeft : PositionRight);
    }
  }, React.createElement(Text, {
    style: styles.company
  }, "ACTBASE"), React.createElement(Text, {
    allowFontScaling: false,
    style: styles.title
  }, "DEVTOOLS ", React.createElement(Text, {
    style: {
      fontSize: 8,
      color: '#999'
    }
  }, "v0.1.0"))), React.createElement(ScrollView, {
    style: {
      flex: 1
    }
  }, React.createElement(DeviceInfoView, {
    even: true
  }), React.createElement(ToolButton, {
    onPress: function () {
      return RNRestart.Restart();
    }
  }, "RESTART"), React.createElement(ToolButton, {
    onPress: function () {
      setShowAxiosLog(!isShowAxiosLog);
      toggleTool();
    },
    even: true
  }, isShowAxiosLog ? 'HIDE' : 'SHOW', " AXIOS LOG"), React.createElement(ToolButton, {
    onPress: function () {
      setShowAsyncStorage(!isShowAsyncStorage);
      toggleTool();
    }
  }, isShowAsyncStorage ? 'HIDE' : 'SHOW', " ASYNC STORAGE"), React.createElement(ToolButton, {
    onPress: function () {
      setShowLog(!isShowLog);
      toggleTool();
    },
    even: true
  }, isShowLog ? 'HIDE' : 'SHOW', " LOG"), React.createElement(ToolButton, {
    onPress: function () {
      setEnableDevTool(false);
    }
  }, "DISABLE DEVTOOL"), extensions.length > 0 && React.createElement(ToolSection, {
    title: 'EXTENSIONS'
  }), extensions === null || extensions === void 0 ? void 0 : extensions.map(function (_a, index) {
    var label = _a.label,
        action = _a.action,
        render = _a.render;
    return [label && React.createElement(ToolButton, {
      key: "tool-button-" + index,
      onPress: function () {
        return action();
      },
      even: (index + 2) % 2 !== 0
    }, label), render && React.createElement(View, {
      key: "tool-render-" + index,
      style: {
        paddingHorizontal: 10,
        alignSelf: 'stretch',
        paddingVertical: 5
      }
    }, render === null || render === void 0 ? void 0 : render())].filter(function (e) {
      return e;
    });
  })), React.createElement(View, {
    style: [{
      paddingBottom: inset.bottom
    }, styles.copyright]
  }, React.createElement(Text, {
    allowFontScaling: false,
    style: styles.actbase
  }, "POWERED BY ACTBASE.LLC."), React.createElement(View, {
    style: {}
  }, React.createElement(Text, {
    style: styles.contact,
    onPress: function () {
      Linking.openURL('mailto:project@actbase.io');
    }
  }, "CONTACT"), React.createElement(View, {
    style: styles.contactUnderline
  }))));
};

export default ToolContent;