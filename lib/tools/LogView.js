import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LogContext } from '../context/log/LogContext';
import { ToolContext } from '../context/toolManager/ToolContext';
import ResizeableView from '../components/ResizeableView';
import Button from '../components/Button';
import { useASStoredState } from '../utils/ASStore';

var DevTreeView = require('react-native-dev-treeview')["default"];

var styles = StyleSheet.create({
  headerExtra: {
    flexDirection: 'row'
  },
  list: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  logDate: {
    fontSize: 12,
    color: 'white',
    width: 80
  },
  logContents: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  logContent: {
    color: '#eee'
  },
  typeLog: {
    color: 'white'
  },
  typeWarn: {
    color: '#cccc66'
  },
  typeError: {
    color: '#cc6666'
  }
});

var getTypeStyle = function (type) {
  if (type === 'log') return styles.typeLog;
  if (type === 'warn') return styles.typeWarn;
  if (type === 'error') return styles.typeError;
  return null;
};

var LogItem = function (_a) {
  var _b;

  var log = _a.log,
      _c = _a.fontSize,
      fontSize = _c === void 0 ? 14 : _c;
  return React.createElement(View, {
    style: styles.row
  }, React.createElement(Text, {
    style: [styles.logDate, getTypeStyle(log.type), {
      fontSize: fontSize
    }]
  }, log.time), React.createElement(View, {
    style: styles.logContents
  }, (_b = log === null || log === void 0 ? void 0 : log.contents) === null || _b === void 0 ? void 0 : _b.map(function (content, index) {
    if (content !== null && typeof content != 'undefined' && typeof content != 'string' && typeof content != 'boolean' && typeof content != 'number' && typeof content == 'object') return React.createElement(View, {
      key: "" + index,
      style: {}
    }, React.createElement(DevTreeView, {
      data: content,
      style: {
        flex: 1,
        backgroundColor: '#33333399'
      },
      fontSize: fontSize
    }));
    return React.createElement(Text, {
      key: "" + index,
      style: [styles.logContent, {
        fontSize: fontSize
      }]
    }, content);
  })));
};

var LogView = function () {
  var _a = React.useContext(LogContext),
      logs = _a.logs,
      clearLogs = _a.clearLogs,
      isStealingLog = _a.isStealingLog,
      stealConsoleLog = _a.stealConsoleLog,
      recoverConsoleLog = _a.recoverConsoleLog,
      logCount = _a.logCount,
      setLogCount = _a.setLogCount;

  var _b = React.useContext(ToolContext).log,
      _c = _b === void 0 ? [] : _b,
      isShow = _c[0],
      setShow = _c[1];

  var _d = useASStoredState('Log_fontsize', 14),
      fontSize = _d[0],
      setFontSize = _d[1];

  if (!isShow) return null;

  var fontSizeUp = function () {
    return setFontSize(function (prev) {
      return Math.min(24, prev + 1);
    });
  };

  var fontSizeDown = function () {
    return setFontSize(function (prev) {
      return Math.max(7, prev - 1);
    });
  };

  var innerTools = function () {
    return React.createElement(View, {
      style: styles.headerExtra
    }, React.createElement(Button, {
      onPress: function () {
        setLogCount(function (prev) {
          return (prev + 100) % 400;
        });
      }
    }, "" + logCount), React.createElement(Button, {
      onPress: fontSizeUp
    }, "+"), React.createElement(Button, {
      onPress: fontSizeDown
    }, "-"), isStealingLog ? React.createElement(Button, {
      onPress: recoverConsoleLog
    }, "R") : React.createElement(Button, {
      onPress: stealConsoleLog
    }, "S"), React.createElement(Button, {
      onPress: clearLogs
    }, "C"));
  };

  return React.createElement(ResizeableView, {
    title: 'Log',
    onClose: function () {
      return setShow(false);
    },
    renderHeaderExtra: innerTools,
    renderFooter: innerTools
  }, React.createElement(FlatList, {
    style: styles.list,
    data: logs,
    renderItem: function (_a) {
      var item = _a.item;
      return React.createElement(LogItem, {
        log: item,
        fontSize: fontSize
      });
    }
  }));
};

export default LogView;