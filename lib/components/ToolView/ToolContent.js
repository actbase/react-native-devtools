import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToolContext } from '../../context/toolManager/ToolContext';
import { setEnableDevTool } from '../../context/devToolEmitter/devToolEmitter';
import assets from '../../assets';
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
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },
  poweredBy: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffaa'
  },
  actbase: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20
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
    allowFontScaling: false,
    style: styles.title
  }, "DevTools ", React.createElement(Text, {
    style: {
      fontSize: 10
    }
  }, "v0.0.1"))), React.createElement(ScrollView, {
    style: {
      flex: 1
    }
  }, React.createElement(DeviceInfoView, null), React.createElement(ToolButton, {
    onPress: function () {
      return RNRestart.Restart();
    }
  }, "Restart"), React.createElement(ToolButton, {
    onPress: function () {
      setShowAxiosLog(!isShowAxiosLog);
      toggleTool();
    }
  }, isShowAxiosLog ? 'Hide' : 'Show', " Axios Log"), React.createElement(ToolButton, {
    onPress: function () {
      setShowAsyncStorage(!isShowAsyncStorage);
      toggleTool();
    }
  }, isShowAsyncStorage ? 'Hide' : 'Show', " AsyncStorage"), React.createElement(ToolButton, {
    onPress: function () {
      setShowLog(!isShowLog);
      toggleTool();
    }
  }, isShowLog ? 'Hide' : 'Show', " Log"), React.createElement(ToolButton, {
    onPress: function () {
      setEnableDevTool(false);
    },
    isLast: true
  }, "Disable DevTool"), extensions.length > 0 && React.createElement(ToolSection, {
    title: 'Extensions'
  }), extensions === null || extensions === void 0 ? void 0 : extensions.map(function (_a, index) {
    var label = _a.label,
        action = _a.action,
        render = _a.render;
    return [label && React.createElement(ToolButton, {
      key: "tool-button-" + index,
      onPress: function () {
        return action();
      },
      isLast: extensions.length - 1 === index
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
    }, styles.poweredBy]
  }, React.createElement(Image, {
    style: styles.actbase,
    source: assets.Actbase
  }), React.createElement(Text, {
    allowFontScaling: false,
    style: {
      fontSize: 14
    }
  }, "Powered By", '\n', React.createElement(Text, {
    style: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  }, "Actbase"))));
};

export default ToolContent;