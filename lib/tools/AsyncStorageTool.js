import { __assign, __awaiter, __generator } from "tslib";
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import ResizeableView from '../components/ResizeableView';
import { ToolContext } from '../context/toolManager/ToolContext';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

var DevTreeView = require('react-native-dev-treeview')["default"];

import { generateUnique } from '../utils/utils';
import { useASStoredState } from '../utils/ASStore';
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  logItem: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginVertical: 5
  },
  log: {
    color: '#ffffff',
    marginHorizontal: 5,
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  query: {
    color: '#ffffff',
    marginHorizontal: 5,
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  logStatus: {
    margin: 5,
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerExtra: {
    flexDirection: 'row'
  }
});

var AsyncStorageToolView = function (_a) {
  var fontSize = _a.fontSize;

  var _b = React.useState(),
      data = _b[0],
      setData = _b[1];

  React.useEffect(function () {
    AsyncStorage.getAllKeys().then(function (keys) {
      return AsyncStorage.multiGet(keys);
    }).then(function (data) {
      setData(data.reduce(function (p, _a) {
        var _b, _c;

        var k = _a[0],
            v = _a[1];
        if (!v) return __assign(__assign({}, p), (_b = {}, _b[k] = v, _b)); // return { ...p, [k]: JSON.parse(v) };
        // console.log( k, v, JSON.parse( v ));

        var parsed = v;

        try {
          parsed = JSON.parse(v);
        } catch (e) {
          parsed = v;
        } finally {
          return __assign(__assign({}, p), (_c = {}, _c[k] = parsed, _c));
        }
      }, {}));
    });
  }, []);
  if (!data) return null;
  return React.createElement(ScrollView, {
    style: {
      flex: 1
    }
  }, React.createElement(ScrollView, {
    horizontal: true
  }, React.createElement(DevTreeView, {
    key: "" + fontSize,
    fontSize: fontSize,
    autoExtendRoot: true,
    data: data
  })));
};

var AsyncStorageTool = function () {
  var _a = useContext(ToolContext).asyncStorage,
      _b = _a === void 0 ? [] : _a,
      isShow = _b[0],
      setShow = _b[1];

  var _c = React.useState(generateUnique()),
      uid = _c[0],
      setUid = _c[1];

  var _d = useASStoredState('AsyncStorage_FontSize', 14),
      fontSize = _d[0],
      setFontSize = _d[1];

  if (!isShow) return null;

  var refresh = function () {
    setUid(generateUnique());
  };

  var removeAll = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var keys;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , AsyncStorage.getAllKeys()];

          case 1:
            keys = _a.sent();
            return [4
            /*yield*/
            , AsyncStorage.multiRemove(keys)];

          case 2:
            _a.sent();

            refresh();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var fontSizeUp = function () {
    setFontSize(function (prev) {
      return Math.min(24, prev + 1);
    });
  };

  var fontSizeDown = function () {
    setFontSize(function (prev) {
      return Math.max(7, prev - 1);
    });
  };

  return React.createElement(ResizeableView, {
    title: 'AsyncStorage',
    onClose: function () {
      return setShow(false);
    },
    renderHeaderExtra: function () {
      return React.createElement(View, {
        style: styles.headerExtra
      }, React.createElement(Button, {
        onPress: fontSizeUp
      }, "+"), React.createElement(Button, {
        onPress: fontSizeDown
      }, "-"), React.createElement(Button, {
        onPress: refresh
      }, "R"), React.createElement(Button, {
        onPress: removeAll
      }, "C"));
    }
  }, React.createElement(AsyncStorageToolView, {
    key: uid,
    fontSize: fontSize
  }));
};

export default AsyncStorageTool;