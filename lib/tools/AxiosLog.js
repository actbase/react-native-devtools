import { __assign, __rest } from "tslib";
import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { AxiosContext } from '../context/axios/AxiosContext';
import ResizeableView from '../components/ResizeableView';
import { ToolContext } from '../context/toolManager/ToolContext';
import { ScrollView } from 'react-native-gesture-handler';
import { useASStoredState } from '../utils/ASStore';
import ClearIconView from '../components/ClearIconView';

var Scenes = require('react-native-scenes')["default"];

var DevTreeView = require('react-native-dev-treeview')["default"];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff88'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#fafafa'
  },
  logItem: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginVertical: 5
  },
  log: {
    color: '#333',
    marginHorizontal: 5,
    fontSize: 6,
    backgroundColor: 'transparent'
  },
  query: {
    color: '#666',
    marginHorizontal: 5,
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  logStatusText: {
    color: 'white'
  },
  logStatus: {
    margin: 5,
    height: 30,
    minWidth: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerExtra: {
    flexDirection: 'row'
  },
  elapse: {
    color: '#ccc'
  }
});
var AxiosLogFontSizeContext = React.createContext({
  fontSize: 14
});

var AxiosLogDetail = function (_a) {
  var log = _a.log,
      etc = __rest(_a, ["log"]);

  var _b = etc;
  var fontSize = React.useContext(AxiosLogFontSizeContext).fontSize;
  return React.createElement(View, {
    style: {
      flex: 1
    }
  }, React.createElement(ScrollView, {
    style: {
      flex: 1
    }
  }, React.createElement(Text, null, " - Request"), React.createElement(ScrollView, {
    style: {
      width: '100%',
      backgroundColor: '#333'
    },
    horizontal: true
  }, React.createElement(DevTreeView, {
    autoExtendRoot: true,
    fontSize: fontSize,
    data: __assign({}, log.config)
  })), React.createElement(Text, null, " - Response"), React.createElement(ScrollView, {
    style: {
      width: '100%',
      backgroundColor: '#333'
    },
    horizontal: true
  }, React.createElement(DevTreeView, {
    autoExtendRoot: true,
    fontSize: fontSize,
    data: __assign({}, log.response)
  })), React.createElement(Text, null, " - All"), React.createElement(ScrollView, {
    style: {
      width: '100%',
      backgroundColor: '#333'
    },
    horizontal: true
  }, React.createElement(DevTreeView, {
    autoExtendRoot: true,
    fontSize: fontSize,
    data: __assign({}, log)
  }))));
};

var colorForStatus = function (status) {
  if (typeof status === 'undefined') return;else if (status >= 200 && status < 400) return '#229922';else if (status >= 400 && status < 500) return '#c82';else if (status >= 500) return '#C33';
  return;
};

var AxiosLogItem = function (_a) {
  var _b, _c, _d, _e, _f;

  var log = _a.log,
      push = _a.push;
  var fontSize = React.useContext(AxiosLogFontSizeContext).fontSize;
  return React.createElement(TouchableOpacity, {
    style: styles.logItem,
    onPress: function () {
      push({
        component: AxiosLogDetail,
        barHidden: true,
        passProps: {
          log: log
        }
      });
    }
  }, React.createElement(View, {
    style: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, log.response ? React.createElement(View, {
    style: [styles.logStatus, {
      backgroundColor: colorForStatus(log.status)
    }]
  }, React.createElement(Text, {
    style: [styles.logStatusText, {
      fontSize: fontSize * 0.6
    }],
    allowFontScaling: false
  }, (_c = (_b = log === null || log === void 0 ? void 0 : log.method) === null || _b === void 0 ? void 0 : _b.toUpperCase) === null || _c === void 0 ? void 0 : _c.call(_b)), React.createElement(Text, {
    style: [styles.logStatusText, {
      fontSize: fontSize * 0.6
    }],
    allowFontScaling: false
  }, log.status)) : React.createElement(View, {
    style: [styles.logStatus, {
      borderRadius: 0
    }]
  }, React.createElement(Text, {
    style: [styles.log, {
      fontSize: fontSize * 0.6
    }],
    allowFontScaling: false
  }, (_e = (_d = log === null || log === void 0 ? void 0 : log.method) === null || _d === void 0 ? void 0 : _d.toUpperCase) === null || _e === void 0 ? void 0 : _e.call(_d)), React.createElement(ActivityIndicator, {
    size: "small",
    color: "white"
  }))), React.createElement(View, {
    style: {
      justifyContent: 'center'
    }
  }, React.createElement(Text, {
    style: [styles.log, {
      fontSize: fontSize
    }],
    selectable: true
  }, log.config.url, React.createElement(Text, {
    style: [styles.elapse, {
      fontSize: fontSize
    }, log.elapse > 1000 && {
      color: '#c00'
    }],
    selectable: true
  }, ' ', log.elapse, "ms")), React.createElement(Text, {
    style: [styles.query, {
      fontSize: fontSize
    }],
    selectable: true
  }, JSON.stringify((_f = log === null || log === void 0 ? void 0 : log.config) === null || _f === void 0 ? void 0 : _f.params))));
};

var AxiosLogList = function (props) {
  var push = props.push;
  var logs = useContext(AxiosContext).logs;
  return React.createElement(FlatList, {
    style: {
      flex: 1
    },
    data: logs,
    keyExtractor: function (item, _) {
      return item.uid;
    },
    ItemSeparatorComponent: function () {
      return React.createElement(View, {
        style: styles.separator
      });
    },
    renderItem: function (_a) {
      var item = _a.item;
      return React.createElement(AxiosLogItem, {
        log: item,
        push: push
      });
    }
  });
};

var AxoisLog = function () {
  var clearLogList = useContext(AxiosContext).clearLogList;

  var _a = useContext(ToolContext).axiosLog,
      _b = _a === void 0 ? [] : _a,
      isShow = _b[0],
      setShow = _b[1];

  var scenesRef = React.useRef();

  var _c = React.useState(0),
      routeIndex = _c[0],
      setRouteIndex = _c[1];

  var _d = useASStoredState('axios_log_fontSize', 12),
      fontSize = _d[0],
      setFontSize = _d[1];

  var _e = useASStoredState('axios_log_count', 500),
      logCount = _e[0],
      setLogCount = _e[1];

  if (!isShow) return null;
  var logs = useContext(AxiosContext).logs;

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

  var innerTools = function (extra) {
    return React.createElement(View, {
      style: styles.headerExtra
    }, React.createElement(Button, {
      onPress: fontSizeUp
    }, "+"), React.createElement(Button, {
      onPress: fontSizeDown
    }, "-"), React.createElement(Button, {
      onPress: function () {
        setLogCount(function (prev) {
          return (prev + 100) % 600;
        });
      }
    }, "" + logCount), React.createElement(Button, {
      onPress: clearLogList
    }, React.createElement(ClearIconView, null)), extra);
  };

  return React.createElement(ResizeableView, {
    title: 'AxiosLog',
    onClose: function () {
      var _a, _b;

      if (routeIndex == 0) setShow(false);
      (_b = (_a = scenesRef.current) === null || _a === void 0 ? void 0 : _a.pop) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    isClose: routeIndex == 0,
    renderHeaderExtra: innerTools,
    renderFooter: function () {
      return innerTools(React.createElement(View, {
        style: {
          justifyContent: 'center',
          paddingHorizontal: 3
        }
      }, React.createElement(Text, {
        style: {
          fontSize: fontSize,
          color: 'white'
        }
      }, logs.length, " logs")));
    }
  }, React.createElement(AxiosLogFontSizeContext.Provider, {
    value: {
      fontSize: fontSize
    }
  }, React.createElement(Scenes, {
    ref: scenesRef,
    style: styles.container,
    route: {
      component: AxiosLogList,
      barHidden: true
    },
    routeWillChange: function (index) {
      return setRouteIndex(index);
    }
  })));
};

export default AxoisLog;